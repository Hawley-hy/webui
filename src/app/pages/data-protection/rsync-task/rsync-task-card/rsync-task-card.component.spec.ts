import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockAuth } from 'app/core/testing/utils/mock-auth.utils';
import { mockWebsocket, mockCall } from 'app/core/testing/utils/mock-websocket.utils';
import { Job } from 'app/interfaces/job.interface';
import { RsyncTaskUi } from 'app/interfaces/rsync-task.interface';
import { IxSlideInRef } from 'app/modules/ix-forms/components/ix-slide-in/ix-slide-in-ref';
import { IxIconHarness } from 'app/modules/ix-icon/ix-icon.harness';
import { IxTable2Harness } from 'app/modules/ix-table2/components/ix-table2/ix-table2.harness';
import { IxTable2Module } from 'app/modules/ix-table2/ix-table2.module';
import { selectJobs } from 'app/modules/jobs/store/job.selectors';
import { AppLoaderModule } from 'app/modules/loader/app-loader.module';
import { RsyncTaskCardComponent } from 'app/pages/data-protection/rsync-task/rsync-task-card/rsync-task-card.component';
import { RsyncTaskFormComponent } from 'app/pages/data-protection/rsync-task/rsync-task-form/rsync-task-form.component';
import { DialogService } from 'app/services/dialog.service';
import { IxChainedSlideInService } from 'app/services/ix-chained-slide-in.service';
import { LocaleService } from 'app/services/locale.service';
import { TaskService } from 'app/services/task.service';
import { WebSocketService } from 'app/services/ws.service';
import { selectSystemConfigState } from 'app/store/system-config/system-config.selectors';

describe('RsyncTaskCardComponent', () => {
  let spectator: Spectator<RsyncTaskCardComponent>;
  let loader: HarnessLoader;
  let table: IxTable2Harness;

  const rsyncTasks = [
    {
      id: 1,
      path: '/mnt/APPS',
      remotehost: 'asd',
      remoteport: null,
      remotemodule: 'asdad',
      desc: 'asd',
      user: 'test',
      extra: [],
      enabled: false,
      mode: 'MODULE',
      remotepath: '',
      direction: 'PUSH',
      delayupdates: true,
      job: {
        id: 1,
        state: 'FINISHED',
        time_finished: {
          $date: new Date().getTime() - 50000,
        },
      },
      ssh_credentials: null,
      schedule: {
        minute: '0',
        hour: '*',
        dom: '*',
        month: '*',
        dow: '*',
      },
      locked: false,
      cron_schedule: '0 * * * *',
      state: {
        state: 'FAILED',
      },
    } as RsyncTaskUi,
  ];

  const createComponent = createComponentFactory({
    component: RsyncTaskCardComponent,
    imports: [
      AppLoaderModule,
      IxTable2Module,
    ],
    providers: [
      mockAuth(),
      provideMockStore({
        selectors: [
          {
            selector: selectJobs,
            value: [{
              id: 1,
              state: 'FINISHED',
              time_finished: {
                $date: new Date().getTime() - 50000,
              },
            } as Job],
          },
          {
            selector: selectSystemConfigState,
            value: {},
          },
        ],
      }),
      mockWebsocket([
        mockCall('rsynctask.query', rsyncTasks),
        mockCall('rsynctask.delete'),
        mockCall('rsynctask.update'),
      ]),
      mockProvider(DialogService, {
        confirm: jest.fn(() => of(true)),
      }),
      mockProvider(IxChainedSlideInService, {
        pushComponent: jest.fn(() => of()),
      }),
      mockProvider(IxSlideInRef),
      mockProvider(MatDialog, {
        open: jest.fn(() => ({
          afterClosed: () => of(true),
        })),
      }),
      mockProvider(LocaleService),
      mockProvider(TaskService, {
        getTaskNextTime: jest.fn(() => new Date(new Date().getTime() + (25 * 60 * 60 * 1000))),
        getTaskCronDescription: jest.fn(() => 'Every hour, every day'),
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    table = await loader.getHarness(IxTable2Harness);
  });

  it('should show table rows', async () => {
    const expectedRows = [
      ['Path', 'Remote Host', 'Frequency', 'Next Run', 'Last Run', 'Enabled', 'State', ''],
      ['/mnt/APPS', 'asd', 'Every hour, every day', 'in 1 day', '1 min. ago', '', 'FINISHED', ''],
    ];

    const cells = await table.getCellTexts();
    expect(cells).toEqual(expectedRows);
  });

  it('shows form to edit an existing Rsync Task when Edit button is pressed', async () => {
    const editButton = await table.getHarnessInCell(IxIconHarness.with({ name: 'edit' }), 1, 7);
    await editButton.click();

    expect(spectator.inject(IxChainedSlideInService).pushComponent).toHaveBeenCalledWith(
      RsyncTaskFormComponent,
      true,
      rsyncTasks[0],
    );
  });

  it('shows form to create new Rsync Task when Add button is pressed', async () => {
    const addButton = await loader.getHarness(MatButtonHarness.with({ text: 'Add' }));
    await addButton.click();

    expect(spectator.inject(IxChainedSlideInService).pushComponent).toHaveBeenCalledWith(
      RsyncTaskFormComponent,
      true,
      undefined,
    );
  });

  it('shows confirmation dialog when Run Now button is pressed', async () => {
    jest.spyOn(spectator.inject(DialogService), 'confirm');
    const runNowButton = await table.getHarnessInCell(IxIconHarness.with({ name: 'play_arrow' }), 1, 7);
    await runNowButton.click();

    expect(spectator.inject(DialogService).confirm).toHaveBeenCalledWith({
      title: 'Run Now',
      message: 'Run «asd - asdad» Rsync now?',
      hideCheckbox: true,
    });

    expect(spectator.inject(WebSocketService).job).toHaveBeenCalledWith('rsynctask.run', [1]);
  });

  it('deletes a Rsync Task with confirmation when Delete button is pressed', async () => {
    const deleteIcon = await table.getHarnessInCell(IxIconHarness.with({ name: 'delete' }), 1, 7);
    await deleteIcon.click();

    expect(spectator.inject(DialogService).confirm).toHaveBeenCalledWith({
      title: 'Confirmation',
      message: 'Delete Rsync Task <b>"asd - asdad"</b>?',
    });

    expect(spectator.inject(WebSocketService).call).toHaveBeenCalledWith('rsynctask.delete', [1]);
  });

  it('updates Rsync Task Enabled status once mat-toggle is updated', async () => {
    const toggle = await table.getHarnessInCell(MatSlideToggleHarness, 1, 5);

    expect(await toggle.isChecked()).toBe(false);

    await toggle.check();

    expect(spectator.inject(WebSocketService).call).toHaveBeenCalledWith(
      'rsynctask.update',
      [1, { enabled: true }],
    );
  });
});

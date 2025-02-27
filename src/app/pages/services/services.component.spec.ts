import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { Router } from '@angular/router';
import {
  createComponentFactory, mockProvider, Spectator,
} from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { CoreComponents } from 'app/core/core-components.module';
import { mockAuth } from 'app/core/testing/utils/mock-auth.utils';
import { mockCall, mockWebsocket } from 'app/core/testing/utils/mock-websocket.utils';
import { ServiceName, serviceNames } from 'app/enums/service-name.enum';
import { ServiceStatus } from 'app/enums/service-status.enum';
import { Service } from 'app/interfaces/service.interface';
import { EntityModule } from 'app/modules/entity/entity.module';
import { IxTableModule } from 'app/modules/ix-tables/ix-table.module';
import { IxTableHarness } from 'app/modules/ix-tables/testing/ix-table.harness';
import { ServiceFtpComponent } from 'app/pages/services/components/service-ftp/service-ftp.component';
import { ServiceNfsComponent } from 'app/pages/services/components/service-nfs/service-nfs.component';
import { ServiceSmartComponent } from 'app/pages/services/components/service-smart/service-smart.component';
import { ServiceSmbComponent } from 'app/pages/services/components/service-smb/service-smb.component';
import { ServiceSnmpComponent } from 'app/pages/services/components/service-snmp/service-snmp.component';
import { ServiceSshComponent } from 'app/pages/services/components/service-ssh/service-ssh.component';
import { ServiceUpsComponent } from 'app/pages/services/components/service-ups/service-ups.component';
import { ServicesComponent } from 'app/pages/services/services.component';
import { DialogService } from 'app/services/dialog.service';
import { IscsiService } from 'app/services/iscsi.service';
import { IxSlideInService } from 'app/services/ix-slide-in.service';
import { WebSocketService } from 'app/services/ws.service';
import { initialState } from 'app/store/services/services.reducer';
import { selectServices } from 'app/store/services/services.selectors';

const hiddenServices = [ServiceName.Gluster, ServiceName.Afp];
const fakeDataSource: Service[] = [...serviceNames.entries()]
  .filter(([serviceName]) => !hiddenServices.includes(serviceName))
  .map(([service], id) => {
    return {
      id,
      service,
      state: ServiceStatus.Stopped,
      enable: false,
    } as Service;
  });

describe('ServicesComponent', () => {
  let spectator: Spectator<ServicesComponent>;
  let loader: HarnessLoader;
  let ws: WebSocketService;
  let table: IxTableHarness;

  const createComponent = createComponentFactory({
    component: ServicesComponent,
    imports: [
      CoreComponents,
      EntityModule,
      IxTableModule,
      FormsModule,
    ],
    providers: [
      mockWebsocket([
        mockCall('service.update', 1),
        mockCall('service.start'),
        mockCall('service.stop'),
      ]),
      mockProvider(DialogService),
      mockProvider(IxSlideInService),
      mockProvider(IscsiService),
      provideMockStore({
        initialState,
        selectors: [{
          selector: selectServices,
          value: fakeDataSource,
        }],
      }),
      mockAuth(),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    ws = spectator.inject(WebSocketService);
    table = await loader.getHarness(IxTableHarness);
  });

  it('should show table rows', async () => {
    const cells = await table.getCells(true);
    const expectedData = [...serviceNames.keys()]
      .filter((service) => !hiddenServices.includes(service))
      .map((service) => [serviceNames.get(service), '', '', '']);

    const expectedRows = [
      ['Name', 'Running', 'Start Automatically', ''],
      ...expectedData,
    ];

    expect(cells).toEqual(expectedRows);
  });

  describe('edit', () => {
    it('should redirect to configure iSCSI service page when edit button is pressed', async () => {
      const router = spectator.inject(Router);
      jest.spyOn(router, 'navigate').mockResolvedValue(true);

      // TODO: remove name attributes and rely on harnesses instead
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-iSCSI"]' }));
      await editButton.click();

      expect(router.navigate).toHaveBeenCalledWith(['/sharing', 'iscsi']);
    });

    it('should open FTP configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-FTP"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceFtpComponent, { wide: true });
    });

    it('should open NFS configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-NFS"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceNfsComponent, { wide: true });
    });

    it('should open SNMP configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-SNMP"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceSnmpComponent, { wide: true });
    });

    it('should open UPS configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-UPS"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceUpsComponent, { wide: true });
    });

    it('should open SSH configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-SSH"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceSshComponent);
    });

    it('should open SMB configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-SMB"]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceSmbComponent);
    });

    it('should open S.M.A.R.T. configuration when edit button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="edit-S.M.A.R.T."]' }));
      await editButton.click();
      expect(spectator.inject(IxSlideInService).open).toHaveBeenCalledWith(ServiceSmartComponent);
    });
  });

  describe('view sessions', () => {
    it('should navigate to view Sessions for SMB when Sessions button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="sessions-SMB"]' }));
      expect(await (await editButton.host()).getAttribute('href')).toBe('/sharing/smb/status/sessions');
    });

    it('should navigate to view Sessions for NFS when Sessions button is pressed', async () => {
      const editButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="sessions-NFS"]' }));
      expect(await (await editButton.host()).getAttribute('href')).toBe('/sharing/nfs/sessions');
    });
  });

  it('should change service enable state when slide is checked', async () => {
    const firstRow = await table.getFirstRow();
    const serviceKey = [...serviceNames.entries()].find(([, value]) => value === firstRow.name)[0];

    const slideToggle = await table.getHarness(MatSlideToggleHarness);
    await slideToggle.toggle();

    expect(ws.call).toHaveBeenCalledWith('service.start', [serviceKey, { silent: false }]);
  });

  it('should change service autostart state when checkbox is ticked', async () => {
    const checkbox = await loader.getHarness(MatCheckboxHarness);
    await checkbox.check();

    expect(await checkbox.isChecked()).toBeTruthy();
    expect(ws.call).toHaveBeenCalledWith('service.update', [0, { enable: true }]);
  });

  it('should show audit log icon for SMB service', async () => {
    const logsButton = await table.getHarness(MatButtonHarness.with({ selector: '[name="logs-SMB"]' }));
    const url = await (await logsButton.host()).getAttribute('href');
    expect(decodeURI(url)).toBe('/system/audit/{"searchQuery":{"isBasicQuery":false,"filters":[["service","%3D","SMB"]]}}');
  });
});

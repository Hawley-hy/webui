import { Enclosure } from 'app/interfaces/enclosure.interface';
import { MockEnclosure } from './mock-enclosure-template';

export class MockEs60 extends MockEnclosure {
  readonly totalSlotsFront: number = 60;
  readonly totalSlotsRear: number = 0;
  readonly totalSlotsInternal: number = 0;

  data = {
    id: '500e0eca095179ff',
    name: 'CELESTIC R0904-F0001-01 0422',
    model: 'ES60',
    controller: false,
    elements: [
      {
        name: 'Array Device Slot',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
          'Device',
        ],
        elements: [],
        has_slot_status: true,
      },
      {
        name: 'Cooling',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5700 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5700 RPM',
            value_raw: '0x1023a01',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5700 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5700 RPM',
            value_raw: '0x1023a01',
          },
          {
            slot: 3,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5800 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5800 RPM',
            value_raw: '0x1024401',
          },
          {
            slot: 4,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5700 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5700 RPM',
            value_raw: '0x1023a01',
          },
          {
            slot: 5,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5800 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5800 RPM',
            value_raw: '0x1024401',
          },
          {
            slot: 6,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '5700 RPM',
            },
            name: 'Cooling',
            descriptor: '',
            status: 'OK',
            value: '5700 RPM',
            value_raw: '0x1023a01',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'Enclosure',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'None',
            },
            name: 'Enclosure',
            descriptor: '',
            status: 'OK',
            value: 'None',
            value_raw: '0x1000000',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'Enclosure Services Controller Electronics',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 384,
            },
            name: 'Enclosure Services Controller Electronics',
            descriptor: '',
            status: 'OK',
            value: 384,
            value_raw: '0x1000180',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 384,
            },
            name: 'Enclosure Services Controller Electronics',
            descriptor: '',
            status: 'OK',
            value: 384,
            value_raw: '0x1000180',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'Power Supply',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'None',
            },
            name: 'Power Supply',
            descriptor: '',
            status: 'OK',
            value: 'None',
            value_raw: '0x1000020',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'None',
            },
            name: 'Power Supply',
            descriptor: '',
            status: 'OK',
            value: 'None',
            value_raw: '0x1000020',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'SAS Connector',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            },
            name: 'SAS Connector',
            descriptor: '',
            status: 'OK',
            value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            value_raw: '0x105ff00',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            },
            name: 'SAS Connector',
            descriptor: '',
            status: 'OK',
            value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            value_raw: '0x105ff00',
          },
          {
            slot: 3,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            },
            name: 'SAS Connector',
            descriptor: '',
            status: 'OK',
            value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            value_raw: '0x105ff00',
          },
          {
            slot: 4,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            },
            name: 'SAS Connector',
            descriptor: '',
            status: 'OK',
            value: 'Mini SAS HD 4x receptacle (SFF-8644) [max 4 phys]',
            value_raw: '0x105ff00',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'SAS Expander',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'None',
            },
            name: 'SAS Expander',
            descriptor: '',
            status: 'OK',
            value: 'None',
            value_raw: '0x1000000',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: 'None',
            },
            name: 'SAS Expander',
            descriptor: '',
            status: 'OK',
            value: 'None',
            value_raw: '0x1000000',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'Temperature Sensor',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '20C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '20C',
            value_raw: '0x1002800',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '19C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '19C',
            value_raw: '0x1002700',
          },
          {
            slot: 3,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '22C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '22C',
            value_raw: '0x1002a00',
          },
          {
            slot: 4,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '27C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '27C',
            value_raw: '0x1002f00',
          },
          {
            slot: 5,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '21C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '21C',
            value_raw: '0x1002900',
          },
          {
            slot: 6,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '20C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '20C',
            value_raw: '0x1002800',
          },
          {
            slot: 7,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '20C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '20C',
            value_raw: '0x1002800',
          },
          {
            slot: 8,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '27C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '27C',
            value_raw: '0x1002f00',
          },
          {
            slot: 9,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '18C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '18C',
            value_raw: '0x1002600',
          },
          {
            slot: 10,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '17C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '17C',
            value_raw: '0x1002500',
          },
          {
            slot: 11,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '28C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '28C',
            value_raw: '0x1003000',
          },
          {
            slot: 12,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '18C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '18C',
            value_raw: '0x1002600',
          },
          {
            slot: 13,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '20C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '20C',
            value_raw: '0x1002800',
          },
          {
            slot: 14,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '27C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '27C',
            value_raw: '0x1002f00',
          },
          {
            slot: 15,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '19C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '19C',
            value_raw: '0x1002700',
          },
          {
            slot: 16,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '20C',
            },
            name: 'Temperature Sensor',
            descriptor: '',
            status: 'OK',
            value: '20C',
            value_raw: '0x1002800',
          },
        ],
        has_slot_status: false,
      },
      {
        name: 'Voltage Sensor',
        descriptor: '',
        header: [
          'Descriptor',
          'Status',
          'Value',
        ],
        elements: [
          {
            slot: 1,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '0.92V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '0.92V',
            value_raw: '0x100005c',
          },
          {
            slot: 2,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '1.0V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '1.0V',
            value_raw: '0x1000064',
          },
          {
            slot: 3,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '1.8V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '1.8V',
            value_raw: '0x10000b4',
          },
          {
            slot: 4,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '3.31V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '3.31V',
            value_raw: '0x100014b',
          },
          {
            slot: 5,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '0.93V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '0.93V',
            value_raw: '0x100005d',
          },
          {
            slot: 6,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '1.0V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '1.0V',
            value_raw: '0x1000064',
          },
          {
            slot: 7,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '1.81V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '1.81V',
            value_raw: '0x10000b5',
          },
          {
            slot: 8,
            data: {
              Descriptor: '',
              Status: 'OK',
              Value: '3.32V',
            },
            name: 'Voltage Sensor',
            descriptor: '',
            status: 'OK',
            value: '3.32V',
            value_raw: '0x100014c',
          },
        ],
        has_slot_status: false,
      },
    ],
    number: 1,
    label: 'CELESTIC R0904-F0001-01 0422',
  } as Enclosure;

  constructor(number: number) {
    super(number);
    this.enclosureNumber = number;
    this.enclosureInit();
  }
}

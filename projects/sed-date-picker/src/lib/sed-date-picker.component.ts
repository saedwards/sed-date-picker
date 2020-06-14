import {Component, Input, EventEmitter, Output, OnInit, ElementRef, ViewChild} from '@angular/core';
import {trigger, transition, style, sequence, animate, query, stagger} from '@angular/animations';

const days = [
  { shortName: 'Mon' },
  { shortName: 'Tue' },
  { shortName: 'Wed' },
  { shortName: 'Thu' },
  { shortName: 'Fri' },
  { shortName: 'Sat' },
  { shortName: 'Sun' }
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const dateButtonPuddleAnimation = [
  style({
    opacity: 0,
    borderRadius: '100%',
    backgroundColor: 'rgb(0, 146, 185)'
  }),
  stagger(15, [
    animate('400ms', style({
      opacity: 1,
      borderRadius: '0',
      backgroundColor: 'rgb(255, 255, 255)'
    }))
  ])
];

@Component({
  selector: 'sed-date-picker',
  templateUrl: './sed-date-picker.component.html',
  styleUrls: ['./sed-date-picker.component.scss'],
  animations: [
    trigger('sedDatePickerDatesAnimation', [
      transition(':enter', [
        query('.date-button', dateButtonPuddleAnimation, {
          optional: true
        })
      ])
    ]),
    trigger('sedDatePickerDropDownAnimation', [
      transition(':enter', [
        style({
          height : '4px'
        }),
        query('[data-month-select-options]', [
          style({
            opacity : 0
          })
        ]),
        sequence([
          animate('100ms', style({
            height : '100%'
          })),
          query('[data-month-select-options]', [
            animate('150ms', style({
              opacity : 1
            }))
          ]),
        ])
      ])
    ])
  ]
})
export class SedDatePickerComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  @Input() fromDate: Date = null;
  @ViewChild('container', {static: true}) containerEl: ElementRef;
  dates: Array<number | undefined> = [];
  month: number;
  monthName: string;
  year: number;
  days: Array<{shortName: string}> = days;
  spacerDatesLength = 0;
  monthSelectOpen = false;
  monthOptions: Array<{id: string, year: number, monthWord: string, date: Date}> = [];
  monthSelectWrap;
  monthSelectOptions;

  static createMonthOptionFromDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
      id: `${month}-${year}`,
      monthWord: monthNames[month],
      year,
      date
    };
  }

  ngOnInit() {
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();

    this.updateMonth();
  }

  updateMonth() {
    const firstDay = new Date(this.year, this.month).getDay();

    this.dates = [
      ...Array(firstDay ? firstDay - 1 : 6),
      ...[...Array(this.getDaysForMonth(this.month + 1, this.year))]
        .map((item, i) => i + 1)
    ];

    this.spacerDatesLength = this.dates.length;
    this.monthName = monthNames[this.month];
  }

  getDaysForMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  nextMonth() {
    if (this.month === 11) {
      this.year++;
    }
    this.month = this.month === 11 ? 0 : this.month + 1;

    this.monthSelectOpen = false;
    this.dates = [];
    setTimeout(this.updateMonth.bind(this), 0);
  }

  prevMonth() {
    if (this.month === 0) {
      this.year--;
    }
    this.month = this.month === 0 ? 11 : this.month - 1;

    this.monthSelectOpen = false;
    this.dates = [];
    setTimeout(this.updateMonth.bind(this), 0);
  }

  toggleMonthSelect() {
    this.monthSelectOpen = !this.monthSelectOpen;

    if (this.fromDate) {
      const year = this.fromDate.getFullYear();
      const month = this.fromDate.getMonth();
      this.monthOptions = [...Array(36)]
        .map((item, i) => SedDatePickerComponent.createMonthOptionFromDate(
          new Date(year, month + i)
        ));
    } else {
      this.monthOptions = [...Array(36)]
        .map((item, i) => SedDatePickerComponent.createMonthOptionFromDate(
          new Date(this.year, this.month + 24 - i)
        ))
        .reverse();
    }

    if (this.monthSelectOpen) {
      setTimeout(() => {
        this.monthSelectWrap = this.containerEl.nativeElement.querySelector('[data-month-select-options-wrap]');
        this.monthSelectOptions = this.containerEl.nativeElement.querySelector('[data-month-select-options]');

        if (!this.fromDate) {
          const el = this.containerEl.nativeElement.querySelector(`[data-month-option="${this.month}-${this.year}"]`);
          this.monthSelectWrap = this.containerEl.nativeElement.querySelector('[data-month-select-options-wrap]');
          this.monthSelectWrap.scrollTop = (el.offsetTop + el.offsetHeight) - 4;
        }
      }, 0);
    }
  }

  addMonthSelectOptionsStart() {
    const firstOption = this.monthOptions[0];

    this.monthOptions = [
      ...[...Array(12)]
        .map((item, i) => SedDatePickerComponent.createMonthOptionFromDate(
          new Date(firstOption.year, firstOption.date.getMonth() - 1 - i)
        ))
        .reverse(),
      ...this.monthOptions,
    ];
  }

  addMonthSelectOptionsEnd() {
    const lastOption = this.monthOptions[this.monthOptions.length - 1];

    this.monthOptions = [
      ...this.monthOptions,
      ...[...Array(12)]
        .map((item, i) => SedDatePickerComponent.createMonthOptionFromDate(
          new Date(lastOption.year, lastOption.date.getMonth() + 1 + i)
        ))
    ];
  }

  onScrollMonthSelectionOptions() {
    const fromBottom = this.monthSelectOptions.offsetHeight -
      (this.monthSelectWrap.scrollTop + this.monthSelectWrap.offsetHeight);

    if (fromBottom < 350) {
      this.addMonthSelectOptionsEnd();
    } else if (this.monthSelectWrap.scrollTop < 350 && !this.fromDate) {
      this.addMonthSelectOptionsStart();
    }
  }

  jumpToMonth(date: Date) {
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.monthSelectOpen = false;
    this.dates = [];
    setTimeout(this.updateMonth.bind(this), 0);
  }

  selectDate(day: number) {
    this.dateSelected.emit(new Date(this.year, this.month, day));
  }

  trackByDate(i, val) {
    return val;
  }

  get rowCount() {
    return Math.ceil(this.dates.length / this.days.length);
  }

  get spacerRowCount() {
    return Math.ceil(this.spacerDatesLength / this.days.length);
  }
}

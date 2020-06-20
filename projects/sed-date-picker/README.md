# Date Picker

A simple date picker component with interactive animation.
By default the date picker component will allow you to select any date in the future or past.
Use the month dropdown and easily scroll months, years or decades to quickly find the date needed. 

## Install
```
npm install @sedware/date-picker
```

## Usage
Import the date picker into your application or feature module after any common modules, libraries or frameowork

```
import { SedDatePickerModule } from '@sedware/date-picker';

@NgModule({
  ...
  imports: [
    ...
    SedDatePickerModule
  ],
  ...
})
export class AppModule { }
```

Use the date picker in your components

```
<sed-date-picker></sed-date-picker>
```

Retrieve the chosen date from a user by binding to the `dateSelected` event

```
<sed-date-picker (dateSelected)="onDateSelected($event);"></sed-date-picker>
```

### Options
- Pass an optional `fromDate` input of native type 
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 
to restrict navigation from a specific date. 

```
<sed-date-picker [fromDate]="fromDate"></sed-date-picker>
```

##Summary
The date picker component scope deliberately excludes the implementation of showing/hiding the date picker.
This should give engineers a lot more flexibility and choice in how the date picker is utilised for different 
applications by not assuming anything about the extrinsic state of the component.

If you have any issues or would like to contribute, please raise a Github 
[issue](https://github.com/saedwards/sed-date-picker/issues) or a PR with new changes.
If you think the component doesn't quite fit your needs and could be improved, you're very welcome to start 
a discussion about new feature requests/changes by raising an issue.

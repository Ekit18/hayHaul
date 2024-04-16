import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRangeFields } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DropdownCalendar } from './dropdown-calendar';

const HIGHEST_YEAR = 2100;
const LOWEST_YEAR = 1900;

interface DatePickerWithRangeProps<T extends FieldValues, K extends Path<DateRangeFields<T>>> {
  field: K;
  title: string;
  disabled?: boolean;
}

export function DatePickerWithRange<T extends FieldValues, K extends Path<DateRangeFields<T>>>({
  field,
  title,
  disabled = false
}: DatePickerWithRangeProps<T, K>) {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();

  // TODO: non-typesafe field. Its type must be inferred from
  const date: DateRange = watch(field);
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="col-span-2 min-h-[56px] rounded-none border-0 border-r-secondary sm:col-span-1 sm:border-r-[1px] lg:col-span-1"
      >
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'mb-[1px] flex h-auto w-full flex-row items-center justify-start border-0 bg-popover px-4 py-2 text-start last-of-type:border-0 sm:mb-0 xl:odd:border-r-[1px]',
            !!errors[field] && 'shadow-[inset_0px_0px_8px_0px_#ff0000]'
          )}
        >
          <div className="flex w-full flex-col justify-between">
            <p className="text-gray-400">{title}</p>
            <p className="overflow-hidden text-clip whitespace-nowrap text-black dark:text-white">
              {date
                ? `${date.from ? format(date.from, 'd MMMM, yyyy', { locale: enUS }) : ''} — ${date?.to ? format(date.to, 'd MMMM, yyyy', { locale: enUS }) : ''}`
                : 'Pick date range'}
            </p>
          </div>
          <CalendarIcon className="ml-auto hidden h-5 w-5 text-secondary xl:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Controller
          control={control}
          name={field}
          render={({ field }) => (
            <DropdownCalendar
              fromYear={LOWEST_YEAR}
              toYear={HIGHEST_YEAR}
              captionLayout="dropdown-buttons"
              mode="range"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

import { Field, useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

export default function SelectInput({ onChange, ...props }: any) {
    const [field, meta] = useField(props)
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        field.onChange(event);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <FormField error={meta.touched && !!meta.error}>
            <select {...field} {...props} onChange={handleSelectChange} />
            {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
            ) : null}
        </FormField>
    )
}
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'

export default function TextInput({ ...props }: any) {
    const [field, meta, helpers] = useField(props)

    return (
        <FormField error={meta.touched && !!meta.error}>
            <input
                {...field}
                {...props}
                value={field.value || ''}
                onChange={(e) => helpers.setValue(e.target.value)}
            />
            {meta.touched && !!meta.error && (
                <Label pointing basic color="red" content={meta.error}></Label>
            )}
        </FormField>
    );
}

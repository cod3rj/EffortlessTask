import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    icon?: string;
}
export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Form.Input {...field} {...props} fluid
                   icon={props.icon ? props.icon : null}
                   iconPosition='left'
                   size='large'
                   />
            {meta.touched && meta.error ? (
                <Label style={{marginBottom: 5, marginTop: 0}} basic color='red' pointing='above'>{meta.error}</Label>
                ) : null }
        </Form.Field>
    )
}
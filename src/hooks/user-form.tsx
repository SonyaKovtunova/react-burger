import { useState } from "react"

export const useForm = (initialForm: { [envName: string]: any } = {})
    : [ { [envName: string]: any }, (data: { [envName: string]: any }) => void, (name: string, value: string) => void ] => {
    const [ form, setForm ] = useState(initialForm);

    const onChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value, });
    };

    const onSet = (data: { [envName: string]: any }) => {
        setForm({ ...form, ...data, });
    }

    return [ form, onSet, onChange ];
}
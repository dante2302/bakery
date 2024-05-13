export interface BaseFormState
{

}

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

export function changeHandler<T extends BaseFormState>(setState:React.Dispatch<React.SetStateAction<T>> , e: InputChangeEvent ){
    e.preventDefault();
    setState(s => ({...s, [e.target.name]: e.target.value}));
}
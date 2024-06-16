interface defaultErrorState{
    [property: string]:
    {
        error: false,
        message: ""
    } 
}

export default function GetDefaultErrorState(propertyNames: string[])
{
    const des: defaultErrorState = {}
    propertyNames.forEach(prop => {
        des[prop] = {
            error: false,
            message: ""
        }
    });
    return des;
}
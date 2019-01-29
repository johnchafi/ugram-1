

export default (state = {}, action) => {
    console.log(action.type == '@@SIMPLE_ACTION');
    switch (action.type) {
        case '@@SIMPLE_ACTION':
            return {
                result: action.type
            };
        default:
            return state
    }
}
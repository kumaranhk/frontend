const getAccesstoken = () => {
    const token = localStorage.getItem('token');
    return token
}


export { getAccesstoken }
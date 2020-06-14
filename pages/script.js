const serverApiPath = "http://localhost:3000/users";
const listWrapperEl = document.getElementById('users-list');

const getUsersList = async (path) => {
    const response = await fetch(path, {
        mode: 'cors',
        credentials: 'include'
    });
    
    return await response.json();
}

const renderUserRow = (user) => {
    const li = document.createElement('li');
    li.innerText = user.name;

    return li;
}

const renderUsersList = (list, parent) => {
    for(let i = 0 ; i < list.length ; i++) {
        parent.appendChild(renderUserRow(list[i]));
    }
}

const render = async (path, el) => {
    try {
        const users = await getUsersList(path);
        
        renderUsersList(users, el);
    } catch(e) {
        console.error(e);
        alert('Error');
    }
}

render(serverApiPath, listWrapperEl);

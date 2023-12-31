// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const list = document.querySelector('#list');




// Server address and routs

const api = 'http://localhost:4000/appointment';




// On page refresh

window.addEventListener('DOMContentLoaded',onRefresh)
async function onRefresh() {
    Array.from(list.children).forEach((x) => x.style.display = 'none');
    try {
        const res = await axios.get(api);
        res.data.forEach(item => addUser(item));
        showMsg('success', 'Refreshed');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Managing form Events

let editing = null;

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if(!isValid()) return;
    if(editing) updateUser(name.value, email.value);
    else storeOnServer(name.value, email.value);
    name.value = '';
    email.value = '';
}




// Validation

function isValid() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    if(name.value.trim().length < 2 && !emailPattern.test(email.value)) showMsg('error', 'Name and Email is invalid');
    else if(name.value.trim().length < 2) showMsg('error', 'Name is invalid');
    else if(!emailPattern.test(email.value)) showMsg('error', 'Email is invalid');
    else return true;
}




// Store on server

async function storeOnServer (name, email) {
    try {
        const res = await axios.post(api, {email,name});
        addUser(res.data);
        showMsg('success', 'Submitted');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Manage list events

list.addEventListener('click', listEvent);
function listEvent(e) {
    if(e.target.classList.contains('dlt-btn')) dltUser(e.target.parentElement);
    else if(e.target.classList.contains('edit-btn')) editUser(e.target.parentElement);
}




// Delete user

async function dltUser(li) {
    try {
        const id = li.getAttribute('data-id');
        await axios.delete( api + "/" + id);
        li.style.display = 'none';
        showMsg('success', 'Deleted');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Edit user 

function editUser(li) {
    name.value = li.children[2].textContent;
    email.value = li.children[3].textContent;
    editing = li;
}




// Update user

async function updateUser(name, email) {
    try {
        const id = editing.getAttribute('data-id');
        const res = await axios.put(api + "/" + id, {email,name});
        editing.children[2].textContent = name;
        editing.children[3].textContent = email;
        showMsg('success', 'Edited');
        editing = null;
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Utility functions 

function showMsg(result, text) {
    msg.classList.add(result);
    msg.textContent = text;
    setTimeout(() => {
        msg.classList.remove(result);
        msg.textContent = '';
    }, 3000);
}

function addUser(user) {
    const li = addElement('li', list);
    const dlt = addElement('button', li, 'X', 'dlt-btn', 'list-btn');
    const edit = addElement('button', li, 'Edit', 'edit-btn', 'list-btn');
    const liName =  addElement('span', li, user.name, 'li-name');
    const liEmail = addElement('span', li, user.email, 'li-email');
    li.setAttribute('data-id', user["id"]);
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}
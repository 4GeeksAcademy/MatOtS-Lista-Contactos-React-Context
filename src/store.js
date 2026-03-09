export const initialStore=()=>{
  return{
    user: "MatOtS",
    urlAPI: "https://playground.4geeks.com/contact/agendas/",
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id != action.payload)
      };BB
    case 'EDIT_CONTACT':
    default:
      throw Error('Unknown action.');
  }    
}

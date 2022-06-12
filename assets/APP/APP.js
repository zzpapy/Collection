
  export function search(data,cat){
    const url = "search"
    return fetch(url+"?"+"value="+data+"&cat="+cat)
    .then(async res => {
      return res.json()
    })
    .then(async res => {
          return res
          
        })
        .catch(er => console.error(er))
  }
  export async function init(data){
    const url = "init"
    try {
      const res = await fetch(url);
      const res_1 = await res.json();
      return await res_1;
    } catch (er) {
      return console.error(er);
    }
  }

  export function cat(data,cat){
    const url = "cat"
    return fetch(url)
        .then(async res => {
          return res.json()
        })
        .then(async res => {
          return res
          
        })
        .catch(er => console.error(er))
  }

  



  



  
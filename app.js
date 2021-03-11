const getAll = document.querySelector('#read_all')
const abcd = document.querySelector('#abc')
getAll.addEventListener('click', (e)=>{
    fetch('http://localhost:8000/api/purchase')
        .then(async(result)=>{
            let text =await result.text();
            console.log(text)
            
            abcd.innerHTML= text
        })
    }
)
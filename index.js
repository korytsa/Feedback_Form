const form = document.querySelector('#form');
const upSort = document.querySelector('.up');
const downSort = document.querySelector('.down');
const averageFill = document.querySelector('.average');

class Review{
    constructor(){
        this.reviewlist = [];
    }
    static validate(data){
        // return (data.from && data.text && data.review !== '' && 
        // data.review > 0 && data.review < 6 ? true : false)
        // or
        let isValidated = true;
        if(!data.text){
            isValidated = false
        }
        if(!data.from){
            console.log(1)
            isValidated = false
        }
        if(!(data.review >= 1 && data.review <= 5)){
            isValidated = false
        }
        return isValidated
    }
    
    render(data){
        let list = document.querySelector('#list');
        list.innerHTML = '';

        this.reviewlist.forEach((item) => {
            let li = document.createElement('li');
            let fromP = document.createElement('span');
            let reviewP = document.createElement('span');
            let textP = document.createElement('p');

            fromP.innerText = item.from;
            reviewP.innerText = `, ${item.review} stars`;
            textP.innerText = item.text;

            li.appendChild(fromP);
            li.appendChild(reviewP);
            li.appendChild(textP);
            list.appendChild(li);
        })
    }
    addToList(data){
        this.reviewlist.push(data);
        this.render();
    }
    getYear(){
        let yearNow = new Date().getFullYear();
        body.insertAdjacentHTML('afterend', `<footer class="year">&#169; ${yearNow}</footer>`);
    }
    getDate(){
        let body = document.querySelector('#body');
        let header = document.createElement('header');
        let dateSpan = document.createElement('span');
        let timeSpan = document.createElement('span');

        setInterval(update, 100)

        body.insertAdjacentElement('afterbegin', header);
        header.appendChild(dateSpan);
        header.appendChild(timeSpan);

        function update(){
            dateSpan.innerText = new Date().toLocaleDateString();
            timeSpan.innerText = new Date().toLocaleTimeString();
        }
    }
    sortUp(data){
        this.reviewlist.sort((a,b) => {
            return a.review - b.review
        })
        this.render();
    }
    sortDown(data){
        this.reviewlist.sort((a,b) => {
            return b.review - a.review
        })
        this.render();
    }
    getAverage(data){
        let sum = this.reviewlist.reduce((acc, item) => {
            return acc + (+item.review)
        }, 0)
        let average = sum / this.reviewlist.length;
        averageFill.innerText = `Average number = ${average}`;
    }
}
const review = new Review();
document.addEventListener('DOMContentLoaded', review.getYear());
document.addEventListener('DOMContentLoaded', review.getDate());


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDate = new FormData(event.target);
    const formDateEntries = formDate.entries();
    const data = Object.fromEntries(formDateEntries)

    let validate = Review.validate(data);
    if(validate){
        review.addToList(data);
        form.reset();
        review.getAverage(data);
        upSort.addEventListener('click', () => {
            review.sortUp(data);
        })
        downSort.addEventListener('click', () => {
            review.sortDown(data);
        })
    } else {
        alert("Enter all date!")
    }
});
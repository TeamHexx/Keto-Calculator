(function () {
// constant variables - data that never changes
const $input = $('input[type="text"]');
// const $brand_name = $('#brand_name');
let hits;
// state variables - data that changes
// cached element references - parts of the dom we need to touch
// event listeners - capture and respond to events i.e. user clicks on something
$('form').on('submit', handlegetData)
// $('form').on('sort', sortData)
const $hits = $('#hits');
const $brand_name = $('#brand_name');
// functions - code that represents actions taken/carried out
function handlegetData(event) {
    event.preventDefault();
    const userInput = $input.val()
    console.log('userInput', userInput)
    $.ajax({ url: 'https://api.nutritionix.com/v1_1/search/'+userInput+'?results=0:40&fields=item_name,brand_name,nf_sugars,nf_dietary_fiber,nf_total_carbohydrate,nf_calories&appId=4e5eb041&appKey=03ce9db54e9af884189a9857ae7b2592'
}).then(function (data) {
    hits = data;
    render();
}, function (error) {
    console.log(error);
});
}

function render() {
    // console.log(hits);
    $hits.empty();
    // console.log("im not working");
    const html = hits.hits.map(function(hit) {
            return `
            <article class="card">
                <h2>${hit.fields.item_name}</h2>
               <ul>
                <li><strong style="font-size: 18px">${hit.fields.nf_sugars}</strong> grams of sugar</li>
                <li><strong style="font-size: 18px">${hit.fields.nf_total_carbohydrate}</strong> grams of carbs</li>
                <li><strong style="font-size: 18px">${hit.fields.nf_dietary_fiber}</strong> grams of fiber</li>
                <li><strong style="font-size: 18px">${hit.fields.nf_calories}</strong> calories</li>
               </ul>
            </article>
        `
        
    });
    $hits.append(html);
}
    // function sortData (hits){
    //     hits.sort();
    // }
})();
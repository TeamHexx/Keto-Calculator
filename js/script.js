// constant variables - data that never changes
const $input = $('input[type="text"]');
// const $brand_name = $('#brand_name');
let hits;
// state variables - data that changes
// cached element references - parts of the dom we need to touch
// const $items = $('#items');
// event listeners - capture and respond to events i.e. user clicks on something
$('form').on('submit', handlegetData)
const $hits = $('#hits');
const $brand_name = $('#brand_name');
// functions - code that represents actions taken/carried out
// init();
// function init() {
//     handlegetData()
// }
function handlegetData(event) {
    event.preventDefault();
    const userInput = $input.val()
    console.log('userInput', userInput)
    $.ajax({ url: 'https://api.nutritionix.com/v1_1/search/'+userInput+'?results=0:20&fields=item_name,brand_name,nf_sugars,nf_dietary_fiber,nf_total_carbohydrate,nf_calories&appId=4e5eb041&appKey=03ce9db54e9af884189a9857ae7b2592'
}).then(function (data) {
    hits = data;
    render();
}, function (error) {
    console.log(error);
});
}

function render() {``
    const html = hits.hits.map(function(hit) {
        return `
            <article class="card">
                <h1>${hit.fields.item_name}</h1>
                <p>${hit.fields.nf_sugars + ' grams of sugar'}</p>
                <p>${hit.fields.nf_total_carbohydrate + ' grams of carbs'}</p>
                <p>${hit.fields.nf_dietary_fiber + ' grams of fiber'}</p>
                <p>${hit.fields.nf_calories + ' calories'}</p>
            </article>
        `
    });
    $hits.append(html);
}

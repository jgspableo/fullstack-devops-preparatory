let xhr = new XMLHttpRequest();
let url = './health_article.json';
xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.onload = function() {
    let articles = xhr.response.articles;
    let articlesDiv = document.getElementById('articles');

    articles.forEach(
        (article) => {
            let articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            
            let title = document.createElement('h2');
            title.textContent = article.title;
    
            let description= document.createElement('p');
            description.textContent = article.description;
    
            let waysHeader = document.createElement('h3');
            waysHeader.textContent = 'Ways to Achieve:';
    
            let waysList = document.createElement('ul');
            article.ways_to_achieve.forEach(
                (way) => {
                    let listItem = document.createElement('li');
                    listItem.textContent = way;
                    waysList.appendChild(listItem);
                }
            )
    
            let benefitsHeader = document.createElement('h3');
            benefitsHeader.textContent = 'Benefits:';
    
            let benefitsList = document.createElement('ul');
            article.benefits.forEach(
                (benefit) => {
                    let listItem = document.createElement('li');
                    listItem.textContent = benefit;
                    benefitsList.appendChild(listItem);
                }
            )
            
            articlesDiv.appendChild(title);
            articlesDiv.appendChild(description);
            articlesDiv.appendChild(waysHeader);
            articlesDiv.appendChild(waysList);
            articlesDiv.appendChild(benefitsHeader);
            articlesDiv.appendChild(benefitsList);
            
            articlesDiv.appendChild(articleDiv);
        }
    );
}

xhr.send();

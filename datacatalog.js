window.onload = function(event) {
    // get the contents of the element with id="datablock1"
    var dataCatalog = JSON.parse(document.querySelector('#datacatalog').innerHTML);

    var title = document.createElement('h1');
    title.textContent = dataCatalog.name;
    var app = document.querySelector('#app');
    
    var url = document.createElement('a');
    url.textContent = dataCatalog.url;
    url.setAttribute('href', dataCatalog.url);
    url.setAttribute('class', 'url');

    var description = document.createElement('p');
    description.textContent = dataCatalog.description;
    description.setAttribute('class', 'description');

    var list = document.createElement('ul');
    list.setAttribute('class', 'datasets');

    dataCatalog.dataset.forEach(function (dataset) {
      var li = document.createElement('li');
      li.setAttribute('class', 'dataset');
      var name = document.createElement('h3');
      name.textContent = dataset.name;
      var url = document.createElement('a');
      url.textContent = dataset.url;
      url.setAttribute('href', dataset.url);
      url.setAttribute('class', 'url');
      li.appendChild(name);
      li.appendChild(url);

      var distributionList = document.createElement('div');
      distributionList.setAttribute('class', 'distributions');

      dataset.distribution.forEach(function (distribution) {
        var a = document.createElement('a');
        a.textContent = distribution.encodingFormat;
        a.setAttribute('href', distribution.contentUrl);
        a.setAttribute('class', 'distribution');
        distributionList.appendChild(a);
      });
      li.appendChild(distributionList);

      list.appendChild(li);
    });

    app.appendChild(title);
    app.appendChild(url);
    app.appendChild(description);
    app.appendChild(list);
  }
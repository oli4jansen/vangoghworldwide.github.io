function addLicense(app, data) {
  var license = document.createElement('a');
  license.setAttribute('href', data.license);
  license.setAttribute('class', 'license');

  var knownLicenses = {
    'http://creativecommons.org/publicdomain/zero/1.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png',
    'http://creativecommons.org/licenses/by-nc-nd/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png',
    'http://creativecommons.org/licenses/by-nd/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png',
    'http://creativecommons.org/licenses/by-nc-sa/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png',
    'http://creativecommons.org/licenses/by-nc/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.png',
    'http://creativecommons.org/licenses/by-sa/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png',
    'http://creativecommons.org/licenses/by/4.0/': 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png'
  };

  data.license = data.license.replace('https://', 'http://');

  if (Object.keys(knownLicenses).includes(data.license)) {
    var licenseImg = document.createElement('img');
    licenseImg.setAttribute('src', knownLicenses[data.license]);
    licenseImg.setAttribute('width', '120px');
    license.appendChild(licenseImg);
  } else {
    license.textContent = data.license;
  }

  app.appendChild(license);
  app.appendChild(document.createElement('br'));
}

window.onload = function () {
  var app = document.querySelector('#app');

  // Get data from page
  var data = JSON.parse(document.querySelector('#datacatalog').innerHTML);

  // Set title
  var title = document.createElement('h1');
  title.textContent = data.name;
  app.appendChild(title);

  // Set URL
  var url = document.createElement('a');
  url.textContent = data.url;
  url.setAttribute('href', data.url);
  url.setAttribute('class', 'url');
  app.appendChild(url);

  if ('creator' in data && data.creator.name) {
    var creator = document.createElement('a');
    creator.textContent = data.creator.name;
    creator.setAttribute('href', data.creator.url);
    creator.setAttribute('class', 'creator');
    app.appendChild(creator);
  }
  
  // Set description
  if ('description' in data) {
    var description = document.createElement('p');
    description.textContent = data.description;
    description.setAttribute('class', 'description');
    app.appendChild(description);
  }

  app.appendChild(document.createElement('br'));

  if ('keywords' in data) {
    var keywordsP = document.createElement('p');
    keywordsP.textContent = 'Keywords:';

    var br = document.createElement('br');
    var keywords = document.createElement('i');
    keywords.textContent = data.keywords.join(', ');

    keywordsP.appendChild(br);
    keywordsP.appendChild(keywords);
    app.appendChild(keywordsP);
  }

  if ('license' in data) {
    addLicense(app, data);
  }

  if ('dateModified' in data) {
    var dateModified = document.createElement('small');
    dateModified.setAttribute('class', 'dateModified');
    dateModified.textContent = 'Last modified ' + data.dateModified;
    app.appendChild(dateModified);
  }


  // Type specific parsing

  if (!('@type' in data)) {
    console.error('Could not determine data type.');
    return;
  }

  // @type DataCatalog
  if (data['@type'] === 'DataCatalog') {
    var title = document.createElement('h2');
    title.textContent = 'Datasets';
    app.appendChild(title);

    // List all datasets
    var list = document.createElement('ul');
    list.setAttribute('class', 'datasets');
  
    // Loop over datasets
    data.dataset.forEach(function (dataset) {
      var li = document.createElement('li');
      li.setAttribute('class', 'dataset');

      // Dataset name
      var name = document.createElement('h3');
      name.textContent = dataset.name;
      li.appendChild(name);

      // Dataset URL
      var url = document.createElement('a');
      url.textContent = dataset.url;
      url.setAttribute('href', dataset.url);
      url.setAttribute('class', 'url');
      li.appendChild(url);

      // Dataset creator
      if ('creator' in dataset) {
        var creator = document.createElement('a');
        creator.textContent = dataset.creator.name;
        creator.setAttribute('href', dataset.creator.url);
        creator.setAttribute('class', 'creator');
        li.appendChild(creator);
      }

      // Dataset citation
      if ('citation' in dataset) {
        var citation = document.createElement('a');
        citation.textContent = dataset.citation.name;
        citation.setAttribute('href', dataset.citation['@id']);
        citation.setAttribute('class', 'citation');
        li.appendChild(citation);
      }
  
      // Dataset secription
      if ('description' in dataset) {
        var description = document.createElement('p');
        description.textContent = dataset.description;
        li.appendChild(description);
      }

      if ('license' in dataset) {
        addLicense(li, dataset);
      }

      var distributionList = document.createElement('div');
      distributionList.setAttribute('class', 'distributions');

      var title = document.createElement('h4');
      title.textContent = 'Distributions';
      distributionList.appendChild(title);  
      
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

    app.appendChild(list);
  }

  // @type Dataset
  if (data['@type'] === 'Dataset') {
    // List all distributions

    var distributionList = document.createElement('div');
    distributionList.setAttribute('class', 'distributions');

    var title = document.createElement('h3');
    title.textContent = 'Distributions';
    app.appendChild(title);  
    
    data.distribution.forEach(function (distribution) {
      var a = document.createElement('a');
      a.textContent = distribution.encodingFormat;
      a.setAttribute('href', distribution.contentUrl);
      a.setAttribute('class', 'distribution');
      distributionList.appendChild(a);
    });
    app.appendChild(distributionList);
  }
  
}

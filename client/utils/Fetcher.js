
class MyFetcher {

  constructor() {
    this.get = this.fetchFactory.bind(this, 'GET');
    this.put = this.fetchFactory.bind(this, 'PUT');
    this.post = this.fetchFactory.bind(this, 'POST');
    this.delete = this.fetchFactory.bind(this, 'DELETE');
  }

  fetchFactory(method, url, body) {
    let options = {
      'method': method,
      'headers': {}
    }

    if (body) {
      console.log('body', body);
      options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
  }

}

export default new MyFetcher();


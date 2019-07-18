import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      artist: null  // my response.
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=10';//;&limit=1';

/////

    var client_id = 'eedd5a8f871641318cf5d8de7d0119e6'; // Your client id
    var client_secret = '8237fdbfb34146189b6c23ab77ca06be'; // Your secret

    // your application requests authorization
    var authOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      //url: 'https://accounts.spotify.com/api/token',//'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials'
      },
      //json: true,
      mode: 'no-cors',
      cache: 'default'
    };

    const params = {
                grant_type: 'client_credentials'
            }
            const searchParams = Object.keys(params).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');

    fetch('https://accounts.spotify.com/api/token', {
         method: 'POST',
         headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: searchParams
            }).then(response => {
        const r = response.json();
        accessToken = r.access_token;
        console.log(accessToken);
      })
      .catch(error => console.log(error))

    //console.log(json);

    var accessToken = '';

    //var request = require("request"); // "Request" library
  
  /*
      .then(json => {
        console
        const artist = json.artists.items[0];        
        this.setState({ artist });
      })*/
    /*
    request.post({
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      url: 'https://accounts.spotify.com/api/token',//'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials'
      },
      json: true,
      mode: 'no-cors',
      cache: 'default'
    }, function(error, response, body) {
      console.log('body', body);
      console.log('response', response);
      console.log('error', error);
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        accessToken = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/users/mbdogluver',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          json: true
          //mode: 'cors',
          //cache: 'default'
        };
        request.get(options, function(error, response, body) {
          console.log(body);
        });
      }
    })*/;

/////

    //var accessToken = token;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      json: true,
      //mode: 'no-cors',
      cache: 'default'
    };

    console.log(FETCH_URL)

    fetch(FETCH_URL, myOptions)
      .then(data => {
        console.log(data.artists.items)
        //this.setState({ artist });
      })
      .then(response => {
        console.log(response);
        response.json()
        console.log(response.artists.items);
      })
      .catch(error => {console.log(error)})
  }

  render() {

    let artist = {
      name: '',
      followers: {
        total: ''
      }
    };
    if (this.state.artist !== null) {
      artist = this.state.artist;
    }

    return (
      // return JSX 
      <div className="container">
        <hr />
        <div className="col-lg-6">
          <div className="input-group">
            <input type="text" 
              onChange={event => { this.setState({ query: event.target.value }) }}
            className="form-control" placeholder="Search for a song, artist, or playlist" />
            <span className="input-group-btn">
              <button 
              onClick={()=> this.search()}
               className="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div> {artist.name} </div>
          <div> {artist.followers.total} </div>
        </div>


        </div>
    )
  }
}
export default App;
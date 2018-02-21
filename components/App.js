App = React.createClass({

  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });

    this.getGif(searchingText, function(gif) {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    }.bind(this));
  },

  getGif: (searchingText) => {
        const GIPHY_API_URL = 'https://api.giphy.com';
        const GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';
        let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;

        fetch(url)
          .then(resp=> resp.json())
          .then(resp => {
            let data = resp.data;
            let gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
          })

  },

  render: function() {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFów!</h1>
          <p>Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
          <Search
              onSearch={this.handleSearch}
          />
          <Gif
              loading={this.state.loading}
              url={this.state.gif.url}
              sourceUrl={this.state.gif.sourceUrl}
            />
      </div>
    );
  }
});

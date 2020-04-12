import React from 'react';

import { Alert, Container, Progress } from 'reactstrap';

class Prices extends React.Component {

  componentDidMount() {
    const { loadConcerts } = this.props;
    loadConcerts();
  }

  render() {
    const { concerts, requests } = this.props;

    if (requests.pending) return <Progress animated color="primary" value={50} />;
    else if (requests.error) return <Alert color="warning">{requests.error}</Alert>;
    else if (!requests.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
    else if (requests.success) return (
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>

        <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        {concerts.map(concert => (
          <div key={concert._id}>
            <h2>Day {concert.day}</h2>
            <p>Performer: {concert.performer}</p>
            <p>Gener: {concert.genre}</p>
            <p>Price: {concert.price}$</p>
            Workshops: {concert.workshops.map(workshop => (
              <ul key={workshop._id}>
                <li key={workshop.name}>{workshop.name}</li>
              </ul>
            ))}
          </div>
        ))}
      </Container>
    )
  }
};

export default Prices;
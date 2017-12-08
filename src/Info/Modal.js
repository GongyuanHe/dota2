import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader } from 'material-ui/Card';

export default class Modal extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      open: false,
      data: this.props.data,
   }
}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        disabled={false}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
          <Card style={styles.card}>
                <CardHeader onClick={this.handleOpen}
                  title={this.props.location}
                  subtitle={this.props.zip}
                />
          </Card>
          <Dialog
            title="Details"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          <div style={styles.detail}>
              <p>Property Address:</p>
              <p>       {this.state.data.property.addr.line1}</p>
              <p>       {this.state.data.property.addr.city}</p>
              <p>Owner Address:</p>
              <p>       {this.state.data.owner.name}</p>
              <p>       {this.state.data.owner.addr.line1}</p>
              <p>       {this.state.data.owner.addr.line2}</p>
              <p>       {this.state.data.owner.addr.city}</p>
          </div>
          </Dialog>
      </div>
    );
  }
}

const styles = ({
    card: {
      width: '200px',
      height: '100px',
    },
    detail: {
      whiteSpace: 'pre-wrap',
    }
});

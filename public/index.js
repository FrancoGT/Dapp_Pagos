class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'total_amount' : 1000,
      'amount' : 100,
      'email' : '',
    }
  }
  async componentDidMount(){
    const result = await axios.get('/get_total_amount');
    this.setState({total_amount : result.data["0"].total_amount});
  }
  onSubmit = async (event) =>{
    event.preventDefault();
    const response = await axios.post('/post_info',{
      amount : this.state.amount,
      email : this.state.email
    })
    window.location.href = response.data;
  }
  render(){
    return(
      <div className="container">
            <div className="col-md-12">
              <div className="card text-center">
                  <div className="card-header">
                    <h1>EL MONTO TOTAL ES: </h1>
                    <div className ="block">
                        <div className="circle">
                          <p>${this.state.total_amount}</p>
                        </div>
                    </div>
                  </div>
                  <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                          onChange = {event=> this.setState({email :event.target.value})}
                        />
                        <small className="form-text text-muted">Bueno, nunca comparta su correo electrónico con nadie más.</small>
                      </div>
                      <div className="form-group">
                        <label>Amount</label>
                        <input type="number" className="form-control"  placeholder="Enter Amount"
                          value={this.state.amount}
                          onChange={event => this.setState({amount : event.target.value})}
                        />
                        <small className="form-text text-muted">Ingrese la cantidad con la que le gustaría participar</small>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                  </div>
              </div>
            </div>
        </div>
    )
  }
};

ReactDOM.render(
  <div>
    <App />
  </div>
, document.getElementById('reactBinding'));

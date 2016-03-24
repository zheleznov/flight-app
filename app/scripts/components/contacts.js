import {fireBase} from '../configs.js';

export default class Contacts extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                message: '',
                email: '',
                name: ''
            },
            isDisabled: true
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.enterData = this.enterData.bind(this);
    }

    enterData(){
        let data = {};

        data.name = ReactDOM.findDOMNode(this.refs.name).value;
        data.email = ReactDOM.findDOMNode(this.refs.email).value;
        data.message = ReactDOM.findDOMNode(this.refs.message).value;

        if(data.name !== '' && data.message !== '' && data.email.match(/^.+@.+\..+$/)) {
            this.setState({isDisabled: false});
            this.setState({data: data});
        } else {
            console.log(11111111)
            this.setState({isDisabled: true});
        }
    }

    sendMessage(e) {
        e.preventDefault();

        if(this.state.isDisabled) return;

        fireBase.set({userMessage: this.state.data}, (error)=> {
            if (error) {
                Materialize.toast('Something goes wrong :( Please try again or later.', 4000);
            } else {
                ReactDOM.findDOMNode(this.refs.name).value = '';
                ReactDOM.findDOMNode(this.refs.email).value = '';
                ReactDOM.findDOMNode(this.refs.message).value = '';
                this.setState({isDisabled: true});

                Materialize.toast('Cool! Thanks for your message!', 4000);
                Materialize.updateTextFields();
                validate_field($('input, textarea'));
            }
        });
    }

    render() {
        let isDisabled = this.state.isDisabled;

        return (
            <div className="row">
                <div className="col l12 s12">
                    <h5>Contacts</h5>
                    <p>Feel free to send your opinion about the app. Or maybe you notice some bugs or have an idea how
                        to make this app better, let Us know :)</p>
                    <form className="contacts-form" action="">
                        <div className="row">
                            <div className="input-field col s8 m6 l4">
                                <input onChange={this.enterData} className="validate name" name="name" type="text" id="name" ref="name" required/>
                                <label for="name">Your Name...</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s8 m6 l4">
                                <input onChange={this.enterData} className="validate email" name="email" type="email" id="email" ref="email" required/>
                                <label for="email">example@site.com</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 l8 m10">
                                <textarea onChange={this.enterData} className="materialize-textarea validate" type="text" rows="3" id="message" ref="message" required></textarea>
                                <label for="message">Your message goes here...</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s2">
                                <a className={isDisabled === true ? 'waves-effect waves-light btn disabled' : 'waves-effect waves-light btn'} onClick={this.sendMessage}>Send</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default class Contacts extends React.Component {
    render() {
        return (
            <div className="mdl-grid contacts-page">
                <div className="mdl-cell mdl-cell--1-col"></div>
                <div className="mdl-cell mdl-cell--8-col">
                    <h5>Contacts</h5>
                    <p>Feel free to send your opinion about the app. Or maybe you notice some bugs or have an idea how
                        to make this app better, let Us know :)</p>
                    <form className="contacts-form" action="">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input name" name="name" type="text" id="name"/>
                            <label className="mdl-textfield__label" for="name">Your Name...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input email" name="email" type="email" id="email"/>
                            <label className="mdl-textfield__label" for="email">example@site.com</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <textarea className="mdl-textfield__input" type="text" rows="3" id="message"></textarea>
                            <label className="mdl-textfield__label" for="message">Your message goes here...</label>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored send-message">
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
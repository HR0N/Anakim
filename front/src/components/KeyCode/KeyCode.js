import './KeyCode.scss';
import {connect} from "react-redux";
import {Component} from "react";


class KeyCode extends Component{
    state = {
        key_code: 'key code',
        key: 'key',
        focus: true,
        pushes_history: [],
        timer: null,
        touch_end_wishes: [
            'Было приятно',
            'Мне не приходилось встречать человека который делает это так',
            'Моё стоп слово "Fluggegecheimen"',
            'Мммм... Спасибо! :)',
            'Мммм... Это было изумительно...',
            'Какие теплые руки...))',
            'Кажется... Я люблю тебя..',
            'Давай чаще так делать',
            'У меня были полозрения, что этим закончится!',
            'Нет, мне, конечно, понравилось и всё такое...',
            'Так как, говоришь, тебя зовут?',
            'Больше так не делай!',
            'Мне ещё ни с кем не было так непонятно...',
            'Тебе тоже показалось?',
            'Что-то как-то… восхитительно...',
            'Потолок надо побелить.',
            'Кто здесь?',
            'У меня такого ни с кем не было',
            'О, да!',
            'Это в мои планы не входило.',
            'Кажется, моя батарейка села...',
        ],
        touch_move: false,

    };
    animate_peach_if_disabled(){
        let peach = document.querySelector('.peach_title');
        if(peach != null){
            if(!this.state.focus){
                peach.classList.add('peach_animate');
            }else{
                peach.classList.remove('peach_animate');
            }
        }
    }
    toggle_peach_animation(){
        if(!this.state.focus){
            this.setState({timer: setTimeout(() => {
                this.animate_peach_if_disabled();
                }, 11000)})
        }else{
            this.setState({timer: clearInterval(this.state.timer)});
            this.animate_peach_if_disabled();
        }
    }

    pushes_chronicle(key, code) {
        let string = `${code} 👉 ${key}`;
        let array = this.state.pushes_history;
        array.push(string);
        if(array.length > 10){array.shift()}
        this.setState({pushes_history: array});
    }
    render_button_history(){
        let array = this.state.pushes_history;
        return array.map((val, key) => {
            return (
                <div key={key}>{val}</div>
            );
        });
    }


    show_key_code(e){
        let key_code = e.keyCode;
        let key = e.key;
        if(key_code === 32){key = 'Space'}
        this.setState({key_code, key});
        this.pushes_chronicle(key, key_code);
    }
    show_finger_code(e, msg){
        // let key_code = 'Палец';
        let key_code = '';
        let key = msg;
        this.setState({key_code, key});
        this.pushes_chronicle(key, key_code);
    }

    render() {
        return (
            <div className={'KeyCode'}
                 tabIndex={0}
                 onKeyDown={(e) => {this.show_key_code(e)}}
                 onTouchStart={(e) => {this.show_finger_code(e, 'Тыц')}}
                 onTouchMove={(e) => {
                     this.setState({touch_move: true});
                     this.show_finger_code(e, 'Вжик-вжик');
                 }}
                 onTouchEnd={(e) => {
                     if(this.state.touch_move){
                         this.show_finger_code(e, this.state.touch_end_wishes[Math.floor(
                             Math.random() * (this.state.touch_end_wishes.length - 0) + 0)]);
                         this.setState({touch_move: false});
                     }
                 }}
            >
                <div className="header">
                    <div className="pushes_history">
                        <div className="history">{this.render_button_history()}</div>
                    </div>
                    <div className="focus_info">
                        <div className={`focus_me ${this.state.focus ? 'fm_y' : 'fm_n'}`}>
                            {this.state.focus ? 'Push the button! (^_^)' : 'Please Focus Me'}
                        </div>
                        <div className="sweet_peach"><div className="peach_title">My Sweet Peach...</div></div>
                    </div>
                </div>
                <div className="keys">
                    <div className="key_w key_code">{this.state.key_code}</div>
                    <div className="key_w key">{this.state.key}</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let focus_me = document.querySelector('.KeyCode');
        focus_me.focus();
        focus_me.autoFocus = true;
        focus_me.addEventListener('focus', (e) => {
            this.setState({focus: true});
            this.toggle_peach_animation();
        });
        focus_me.addEventListener('blur', (e) => {
            this.setState({focus: false});
            this.toggle_peach_animation();
        });
    }
    componentWillUnmount() {
        let focus_me = document.querySelector('.KeyCode');
        focus_me.removeEventListener('focus', (e) => {this.setState({focus: true})});
        focus_me.removeEventListener('blur', (e) => {this.setState({focus: false})});

    }
}




function mapStateToProps(state) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(KeyCode);

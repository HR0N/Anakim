import './CurrentProject.scss';
import {connect} from "react-redux";
import {Component} from "react";
import Item from "./Item/Item";


const main_items = ["Постановка целей и задач;", "Проработка технического задания;", "Прототипирование;",
    "Создание макета дизайна;", "Верстка;", "Программирование;", "Наполнение контентом;", "SEO;", "Тестирование;",
    "Сдача проекта;"];

class CurrentProject extends Component{


    render_items(){
        return main_items.map((val, index) => {
            return (
                <Item
                    key={index}
                    main_item={val}
                />
            );
        });
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className={'CurrentProject'}>
                <ol className={'cur_project_ol'}>
                    {this.render_items()}
                </ol>
                <div className="footer">
                    <div className="btn btn-outline-dark">Назад</div>
                </div>
            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(CurrentProject);

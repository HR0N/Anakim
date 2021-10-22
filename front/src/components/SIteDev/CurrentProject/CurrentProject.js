import './CurrentProject.scss';
import {connect} from "react-redux";
import {Component} from "react";
import Item from "./Item/Item";
// import {fetch_sub_items} from "../../../redux/actions/SiteDev";


const main_items = ["Постановка целей и задач;", "Проработка технического задания;", "Прототипирование;",
    "Создание макета дизайна;", "Верстка;", "Программирование;", "Наполнение контентом;", "SEO;", "Тестирование;",
    "Сдача проекта;"];

class CurrentProject extends Component{


    render_items(){
        return main_items.map((val, index) => {
            return (
                <Item
                    key={index}
                    index={index}
                    cur_project_id={this.props.cur_project_id}
                    main_item={val}
                    addSubItem={this.props.addSubItem}
                />
            );
        });
    }
    componentDidMount() {
        /*this.props.fetchSubItems();
        this.unsubscribe = store.subscribe(() => {this.forceUpdate(); console.log(this.props.sub_items);});*/
    }
    componentWillUnmount() {
        /*this.unsubscribe();*/
    }

    render() {
        return (
            <div className={'CurrentProject'}>
                <ol className={'cur_project_ol'}>
                    {this.render_items()}
                </ol>
                <div className="footer">
                    <div className="btn btn-outline-dark"
                    onClick={() => {this.props.back()}}
                    >Назад</div>
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        // sub_items: state.SiteDevReducer.sub_items,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        // fetchSubItems: () => {dispatch(fetch_sub_items())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentProject);

import './CurrentProject.scss';
import {connect} from "react-redux";
import {Component} from "react";
import Item from "./Item/Item";
import {destroy_project, fetch_sub_items} from "../../../redux/actions/SiteDev";


const main_items = ["Постановка целей и задач;", "Проработка технического задания;", "Прототипирование;",
    "Создание макета дизайна;", "Верстка;", "Программирование;", "Наполнение контентом;", "SEO;", "Тестирование;",
    "Сдача проекта;"];

class CurrentProject extends Component{
    state = {
    };


    render_items(){
        return main_items.map((val, index) => {
            return (
                <Item
                    key={index}
                    index={index}
                    cur_project_id={this.props.cur_project_id}
                    main_item={val}
                    addSubItem={this.props.addSubItem}
                    toggleEditSubItem={this.props.toggleEditSubItem}
                />
            );
        });
    }
    componentDidMount() {
        this.props.fetchSubItems(this.props.cur_project_id);
        this.change_title();
    }
    change_title(){
        if(this.props.cur_project_id){
            this.props.projects.map((val) => {
                if(val.id === this.props.cur_project_id){
                    return this.props.setTitle(val.title);
                }
            });
        }
    }
    delete_project(){
        let result = window.confirm('Удалить этот проект?');
        if(result){
            this.props.destroy_project(this.props.cur_project_id);
            this.props.back();
        }
    }

    render() {
        return (
            <div className={'CurrentProject'}>
                <ol className={'cur_project_ol'}>
                    {this.render_items()}
                </ol>
                <div className="footer">
                    <div className="btn btn-outline-dark"
                         onClick={() => {
                             this.delete_project();
                         }}
                    >Удалить</div>
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
        sub_items: state.SiteDevReducer.sub_items,
        current_project_id: state.SiteDevReducer.current_project_id,
        projects: state.SiteDevReducer.projects,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        destroy_project: (id) => {dispatch(destroy_project(id))},
        fetchSubItems: (id) => {dispatch(fetch_sub_items(id))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentProject);

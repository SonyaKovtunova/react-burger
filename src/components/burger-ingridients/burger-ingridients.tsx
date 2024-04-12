import React from "react";
import { ICategory } from "../../interfaces/category-interface";
import IngridientCategory from "./ingridient-category/ingridient-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyles from './burger-ingridients.module.css';

interface IBurgerIngridientsProps {
    categories: ICategory[],
}

class BurgerIngridients extends React.Component<IBurgerIngridientsProps, any> {
    constructor(props: IBurgerIngridientsProps) {
        super(props);
        this.state = {
            activeCategoryType: 'bun'
        }
    }

    render() {

        const categories = [
            {
                type: 'bun',
                name: 'Булки',
            }, 
            {
                type: 'sauce',
                name: 'Соусы',
            },
            {
                type: 'main',
                name: 'Начинки',
            }
        ];

        return (
            <>
                <p className="text text_type_main-large mb-5">Соберите бургер</p>
                <div className={burgerIngridientsStyles.tabs}>
                    {
                        categories.map((category, index) => {
                            return <Tab 
                                key={index}
                                value={category.type} 
                                active={this.state.activeCategoryType === category.type} 
                                onClick={ () => this.setState({ activeCategoryType: category.type }) }>
                                {category.name}
                            </Tab>
                        })
                    }
                </div>
                <>
                    {
                        this.props.categories.map((category, index) => {
                            return <IngridientCategory category={category} key={index} />;
                        })
                    }
                </>
                
            </>
        );
    }
}
  
export default BurgerIngridients; 
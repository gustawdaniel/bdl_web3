export interface Image {
    data: {
        attributes: {
            url: string
            formats?: {
                medium?: {
                    url: string
                },
                thumbnail?: {
                    url: string
                }
            }
        }
    } | null
}

export interface User {
    email: string
}

export interface Nutrition {
    id: number,
    name: string
    value: number
    unit: string
}

export interface RecipeAttributes {
    name: string
    cooking_time_value: number,
    dish_reward_for_cooking: number
    cooking_counter: number,
    cooking_time_unit: string
    short_description: string
    photo: Image
    nutrition: Nutrition[]
    ingredients: Nutrition[]
}

export interface Recipe {
    id: number,
    attributes: RecipeAttributes
}

export interface Meal {
    id: number
    attributes: {
        name: string,
        social_media_post?: string,
        dish_token: number,
        adm_token: number,
        recipe?: {data: Recipe},
        ingredients_image?: Image
        meal_image?: Image
    }
}

export function recipeImageUrl(recipe: Recipe, config: any): string {
    if(recipe.attributes.photo?.data && recipe.attributes.photo.data.attributes.formats?.medium) {
        return `${config.public.baseUrl}${recipe.attributes.photo.data.attributes.formats.medium.url}`;
    } else if(recipe.attributes.photo.data) {
        return `${config.public.baseUrl}${recipe.attributes.photo.data.attributes.url}`;
    } else {
        return '';
    }
}

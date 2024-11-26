import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Filters, Recipe } from '../types';
import { useEffect, useState } from 'react';
import RecipeApi from '@/components/RecipeApi';
import { RecipeInfo } from '@/components/RecipeInfo';

const PAGE_SIZE = 2;

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const recipeApi = new RecipeApi();
  const route = useRoute();
  const { filters } = route.params as { filters?: Filters } || {};
  
  const fetchRecipes = async (resetPage = false) => {
    if (resetPage) {
      setPage(0);
    }
    setLoading(true);
    try {
      console.log('Fetching recipes home screen, page:', page);
      // const response = await recipeApi.searchRecipes({
      //   addRecipeNutrition: true,
      //   addRecipeInstructions: true,
      //   fillIngredients: true,
      //   number: PAGE_SIZE,
      //   offset: resetPage ? 0 : page,
      //   instructionsRequired: true,
      //   sort: 'popularity',
      //   ...filters
      // });
      // const offset = response.offset;
      // const number = response.number;
      // const newOffset = offset + number;
      setPage(2);
      // const recipes = response.results;
      setRecipes([{
        "vegetarian": false,
        "vegan": false,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": false,
        "cheap": false,
        "veryPopular": true,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 3,
        "gaps": "no",
        "preparationMinutes": null,
        "cookingMinutes": null,
        "aggregateLikes": 32767,
        "healthScore": 0,
        "creditsText": "blogspot.com",
        "sourceName": "blogspot.com",
        "pricePerServing": 23.36,
        "extendedIngredients": [
            {
                "id": 9040,
                "aisle": "Produce",
                "image": "bananas.jpg",
                "consistency": "SOLID",
                "name": "bananas",
                "nameClean": "banana",
                "original": "2 ripe bananas, mashed until smooth & creamy",
                "originalName": "ripe bananas, mashed until smooth & creamy",
                "amount": 2,
                "unit": "",
                "meta": [
                    "ripe",
                    "mashed"
                ],
                "measures": {
                    "us": {
                        "amount": 2,
                        "unitShort": "",
                        "unitLong": ""
                    },
                    "metric": {
                        "amount": 2,
                        "unitShort": "",
                        "unitLong": ""
                    }
                }
            },
            {
                "id": 1014615,
                "aisle": "Baking",
                "image": "shortening.jpg",
                "consistency": "SOLID",
                "name": "butter flavor shortening",
                "nameClean": "butter flavored shortening",
                "original": "1 tsp butter flavor extract ** (optional)",
                "originalName": "butter flavor extract ** (optional)",
                "amount": 1,
                "unit": "tsp",
                "meta": [],
                "measures": {
                    "us": {
                        "amount": 1,
                        "unitShort": "tsp",
                        "unitLong": "teaspoon"
                    },
                    "metric": {
                        "amount": 1,
                        "unitShort": "tsp",
                        "unitLong": "teaspoon"
                    }
                }
            },
            {
                "id": 10019146,
                "aisle": "Baking",
                "image": "chocolate-chips.jpg",
                "consistency": "SOLID",
                "name": "chocolate chips",
                "nameClean": "mini chocolate chips",
                "original": "1/4 cup carob or chocolate chips (**optional)",
                "originalName": "carob or chocolate chips (**optional)",
                "amount": 0.25,
                "unit": "cup",
                "meta": [
                    "(**optional)"
                ],
                "measures": {
                    "us": {
                        "amount": 0.25,
                        "unitShort": "cups",
                        "unitLong": "cups"
                    },
                    "metric": {
                        "amount": 45,
                        "unitShort": "ml",
                        "unitLong": "milliliters"
                    }
                }
            },
            {
                "id": 10116098,
                "aisle": "Nut butters, Jams, and Honey",
                "image": "peanut-butter.png",
                "consistency": "SOLID",
                "name": "creamy peanut butter",
                "nameClean": "creamy peanut butter",
                "original": "1/3 cup peanut butter - creamy or chunky",
                "originalName": "peanut butter - creamy or chunky",
                "amount": 0.33333334,
                "unit": "cup",
                "meta": [],
                "measures": {
                    "us": {
                        "amount": 0.33333334,
                        "unitShort": "cups",
                        "unitLong": "cups"
                    },
                    "metric": {
                        "amount": 86,
                        "unitShort": "g",
                        "unitLong": "grams"
                    }
                }
            },
            {
                "id": 12135,
                "aisle": "Nuts",
                "image": "nuts-mixed.jpg",
                "consistency": "SOLID",
                "name": "nuts",
                "nameClean": "nuts",
                "original": "1/4 cup chopped nuts (peanut, walnut, or your favorite)",
                "originalName": "chopped nuts (peanut, walnut, or your favorite)",
                "amount": 0.25,
                "unit": "cup",
                "meta": [
                    "chopped",
                    "your favorite",
                    "(peanut, walnut, or )"
                ],
                "measures": {
                    "us": {
                        "amount": 0.25,
                        "unitShort": "cups",
                        "unitLong": "cups"
                    },
                    "metric": {
                        "amount": 36,
                        "unitShort": "g",
                        "unitLong": "grams"
                    }
                }
            },
            {
                "id": 8121,
                "aisle": "Cereal",
                "image": "porridge-or-cream-of-wheat.png",
                "consistency": "SOLID",
                "name": "oatmeal",
                "nameClean": "cooked rolled oats",
                "original": "1 1/2 cups quick oatmeal - uncooked (or use old fashioned oats for more oatmeal texture)",
                "originalName": "quick oatmeal - uncooked (or use old fashioned oats for more oatmeal texture)",
                "amount": 1.5,
                "unit": "cups",
                "meta": [
                    "uncooked",
                    "quick",
                    "(or use old fashioned oats f oatmeal texture)"
                ],
                "measures": {
                    "us": {
                        "amount": 1.5,
                        "unitShort": "cups",
                        "unitLong": "cups"
                    },
                    "metric": {
                        "amount": 350,
                        "unitShort": "g",
                        "unitLong": "grams"
                    }
                }
            },
            {
                "id": 9019,
                "aisle": "Canned and Jarred",
                "image": "applesauce.png",
                "consistency": "SOLID",
                "name": "unsweetened applesauce",
                "nameClean": "applesauce",
                "original": "2/3 cup unsweetened applesauce",
                "originalName": "unsweetened applesauce",
                "amount": 0.6666667,
                "unit": "cup",
                "meta": [
                    "unsweetened"
                ],
                "measures": {
                    "us": {
                        "amount": 0.6666667,
                        "unitShort": "cups",
                        "unitLong": "cups"
                    },
                    "metric": {
                        "amount": 162.667,
                        "unitShort": "ml",
                        "unitLong": "milliliters"
                    }
                }
            },
            {
                "id": 2050,
                "aisle": "Baking",
                "image": "vanilla-extract.jpg",
                "consistency": "LIQUID",
                "name": "vanilla extract",
                "nameClean": "vanilla extract",
                "original": "1 tsp vanilla extract",
                "originalName": "vanilla extract",
                "amount": 1,
                "unit": "tsp",
                "meta": [],
                "measures": {
                    "us": {
                        "amount": 1,
                        "unitShort": "tsp",
                        "unitLong": "teaspoon"
                    },
                    "metric": {
                        "amount": 1,
                        "unitShort": "tsp",
                        "unitLong": "teaspoon"
                    }
                }
            },
            {
                "id": 99076,
                "aisle": "Health Foods",
                "image": "protein-powder-vanilla.png",
                "consistency": "SOLID",
                "name": "vanilla protein powder",
                "nameClean": "vanilla protein powder",
                "original": "1 scoop vanilla protein powder ** (can be made without, cookie will just be lower in protein)",
                "originalName": "vanilla protein powder ** (can be made without, cookie will just be lower in protein)",
                "amount": 1,
                "unit": "scoop",
                "meta": [
                    "(can be made without, cookie will just be lower in protein)"
                ],
                "measures": {
                    "us": {
                        "amount": 1,
                        "unitShort": "scoop",
                        "unitLong": "scoop"
                    },
                    "metric": {
                        "amount": 1,
                        "unitShort": "scoop",
                        "unitLong": "scoop"
                    }
                }
            }
        ],
        "id": 945221,
        "title": "Watching What I Eat: Peanut Butter Banana Oat Breakfast Cookies with Carob / Chocolate Chips",
        "readyInMinutes": 45,
        "servings": 16,
        "sourceUrl": "http://watching-what-i-eat.blogspot.com/2012/06/peanut-butter-banana-oat-breakfast.html",
        "image": "https://img.spoonacular.com/recipes/945221-312x231.jpg",
        "imageType": "jpg",
        "nutrition": {
            "nutrients": [
                {
                    "name": "Calories",
                    "amount": 103.19,
                    "unit": "kcal",
                    "percentOfDailyNeeds": 5.16
                },
                {
                    "name": "Fat",
                    "amount": 5.38,
                    "unit": "g",
                    "percentOfDailyNeeds": 8.28
                },
                {
                    "name": "Saturated Fat",
                    "amount": 1.32,
                    "unit": "g",
                    "percentOfDailyNeeds": 8.22
                },
                {
                    "name": "Carbohydrates",
                    "amount": 11.25,
                    "unit": "g",
                    "percentOfDailyNeeds": 3.75
                },
                {
                    "name": "Net Carbohydrates",
                    "amount": 9.84,
                    "unit": "g",
                    "percentOfDailyNeeds": 3.58
                },
                {
                    "name": "Sugar",
                    "amount": 5.27,
                    "unit": "g",
                    "percentOfDailyNeeds": 5.85
                },
                {
                    "name": "Cholesterol",
                    "amount": 4.27,
                    "unit": "mg",
                    "percentOfDailyNeeds": 1.42
                },
                {
                    "name": "Sodium",
                    "amount": 31.31,
                    "unit": "mg",
                    "percentOfDailyNeeds": 1.36
                },
                {
                    "name": "Alcohol",
                    "amount": 0.09,
                    "unit": "g",
                    "percentOfDailyNeeds": 100
                },
                {
                    "name": "Alcohol %",
                    "amount": 0.19,
                    "unit": "%",
                    "percentOfDailyNeeds": 100
                },
                {
                    "name": "Protein",
                    "amount": 3.67,
                    "unit": "g",
                    "percentOfDailyNeeds": 7.34
                },
                {
                    "name": "Manganese",
                    "amount": 0.29,
                    "unit": "mg",
                    "percentOfDailyNeeds": 14.61
                },
                {
                    "name": "Magnesium",
                    "amount": 25.14,
                    "unit": "mg",
                    "percentOfDailyNeeds": 6.29
                },
                {
                    "name": "Fiber",
                    "amount": 1.4,
                    "unit": "g",
                    "percentOfDailyNeeds": 5.61
                },
                {
                    "name": "Phosphorus",
                    "amount": 53.43,
                    "unit": "mg",
                    "percentOfDailyNeeds": 5.34
                },
                {
                    "name": "Vitamin B3",
                    "amount": 0.98,
                    "unit": "mg",
                    "percentOfDailyNeeds": 4.89
                },
                {
                    "name": "Vitamin B6",
                    "amount": 0.09,
                    "unit": "mg",
                    "percentOfDailyNeeds": 4.43
                },
                {
                    "name": "Copper",
                    "amount": 0.08,
                    "unit": "mg",
                    "percentOfDailyNeeds": 4.1
                },
                {
                    "name": "Vitamin E",
                    "amount": 0.56,
                    "unit": "mg",
                    "percentOfDailyNeeds": 3.71
                },
                {
                    "name": "Potassium",
                    "amount": 127.47,
                    "unit": "mg",
                    "percentOfDailyNeeds": 3.64
                },
                {
                    "name": "Zinc",
                    "amount": 0.47,
                    "unit": "mg",
                    "percentOfDailyNeeds": 3.11
                },
                {
                    "name": "Iron",
                    "amount": 0.47,
                    "unit": "mg",
                    "percentOfDailyNeeds": 2.61
                },
                {
                    "name": "Folate",
                    "amount": 10.31,
                    "unit": "µg",
                    "percentOfDailyNeeds": 2.58
                },
                {
                    "name": "Vitamin B1",
                    "amount": 0.04,
                    "unit": "mg",
                    "percentOfDailyNeeds": 2.39
                },
                {
                    "name": "Selenium",
                    "amount": 1.58,
                    "unit": "µg",
                    "percentOfDailyNeeds": 2.26
                },
                {
                    "name": "Vitamin B5",
                    "amount": 0.21,
                    "unit": "mg",
                    "percentOfDailyNeeds": 2.08
                },
                {
                    "name": "Calcium",
                    "amount": 20.23,
                    "unit": "mg",
                    "percentOfDailyNeeds": 2.02
                },
                {
                    "name": "Vitamin B2",
                    "amount": 0.03,
                    "unit": "mg",
                    "percentOfDailyNeeds": 1.9
                },
                {
                    "name": "Vitamin C",
                    "amount": 1.41,
                    "unit": "mg",
                    "percentOfDailyNeeds": 1.71
                }
            ],
            "properties": [
                {
                    "name": "Glycemic Index",
                    "amount": 9.93,
                    "unit": ""
                },
                {
                    "name": "Glycemic Load",
                    "amount": 3.24,
                    "unit": ""
                },
                {
                    "name": "Inflammation Score",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Nutrition Score",
                    "amount": 3.2178260593310646,
                    "unit": "%"
                }
            ],
            "flavonoids": [
                {
                    "name": "Cyanidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Petunidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Delphinidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Malvidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Pelargonidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Peonidin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Catechin",
                    "amount": 0.97,
                    "unit": "mg"
                },
                {
                    "name": "Epigallocatechin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Epicatechin",
                    "amount": 0.55,
                    "unit": "mg"
                },
                {
                    "name": "Epicatechin 3-gallate",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Epigallocatechin 3-gallate",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Theaflavin",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Thearubigins",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Eriodictyol",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Hesperetin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Naringenin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Apigenin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Luteolin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Isorhamnetin",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Kaempferol",
                    "amount": 0.02,
                    "unit": "mg"
                },
                {
                    "name": "Myricetin",
                    "amount": 0,
                    "unit": "mg"
                },
                {
                    "name": "Quercetin",
                    "amount": 0.21,
                    "unit": "mg"
                },
                {
                    "name": "Theaflavin-3,3'-digallate",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Theaflavin-3'-gallate",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Theaflavin-3-gallate",
                    "amount": 0,
                    "unit": ""
                },
                {
                    "name": "Gallocatechin",
                    "amount": 0,
                    "unit": "mg"
                }
            ],
            "ingredients": [
                {
                    "id": 9040,
                    "name": "bananas",
                    "amount": 0.13,
                    "unit": "",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 3.36,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.05,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 52.81,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 0.74,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 0.15,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0.16,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 13.13,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 3.98,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Choline",
                            "amount": 1.45,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0.05,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0.01,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 9.44,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0.1,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0.05,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0.07,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 2.95,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 1.8,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.38,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.15,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0.04,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 3.24,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 1.28,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.02,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 2.98,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0.04,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        },
                        {
                            "name": "Fluoride",
                            "amount": 0.32,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        }
                    ]
                },
                {
                    "id": 1014615,
                    "name": "butter flavor shortening",
                    "amount": 0.06,
                    "unit": "tsp",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.31,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0.13,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Trans Fat",
                            "amount": 0.04,
                            "unit": "g",
                            "percentOfDailyNeeds": 459.46
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 2.72,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Choline",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0.09,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0.16,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.08,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        }
                    ]
                },
                {
                    "id": 10019146,
                    "name": "chocolate chips",
                    "amount": 0.02,
                    "unit": "cup",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 1.92,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.66,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0.42,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Calcium",
                            "amount": 3.26,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Sugar",
                            "amount": 1.76,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Trans Fat",
                            "amount": 0.01,
                            "unit": "g",
                            "percentOfDailyNeeds": 459.46
                        },
                        {
                            "name": "Sodium",
                            "amount": 1.91,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.08,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Protein",
                            "amount": 0.13,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 14.12,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.41,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 1.85,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 6.3,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Iron",
                            "amount": 0.03,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        }
                    ]
                },
                {
                    "id": 10116098,
                    "name": "creamy peanut butter",
                    "amount": 0.02,
                    "unit": "cup",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 1.2,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 2.75,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 30.32,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 1.37,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 2.63,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0.49,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 0.22,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0.14,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 1.21,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 32.09,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 9.08,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Choline",
                            "amount": 3.39,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0.06,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0.66,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0.71,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0.02,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 4.62,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0.56,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.26,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 23.06,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0.08,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 18.22,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.54,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 0.94,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0.09,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        },
                        {
                            "name": "Fluoride",
                            "amount": 0.17,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        }
                    ]
                },
                {
                    "id": 12135,
                    "name": "nuts",
                    "amount": 0.02,
                    "unit": "cup",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 0.57,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 1.16,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 13.43,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0.71,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 1.58,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0.09,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0.39,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 13.36,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 5.06,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0.03,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0.24,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0.34,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0.11,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 1.13,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Copper",
                            "amount": 0.03,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.2,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.27,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0.04,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 9.79,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.16,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 0.37,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0.08,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        }
                    ]
                },
                {
                    "id": 8121,
                    "name": "oatmeal",
                    "amount": 0.09,
                    "unit": "cups",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 2.63,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.33,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 15.31,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0.1,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 1.97,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 1.18,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0.22,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Trans Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 459.46
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0.56,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 15.53,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 5.91,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Choline",
                            "amount": 1.62,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0.07,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0.12,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0.05,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0.07,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 1.31,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0.06,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.37,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.88,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0.13,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 16.84,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.07,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 2.25,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0.2,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        },
                        {
                            "name": "Fluoride",
                            "amount": 15.66,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        }
                    ]
                },
                {
                    "id": 9019,
                    "name": "unsweetened applesauce",
                    "amount": 0.04,
                    "unit": "cup",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 1.15,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.01,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 7.52,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 0.41,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 0.03,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0.02,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 4.27,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 0.31,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Choline",
                            "amount": 0.22,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 2.95,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0.01,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0.05,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 0.31,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0.95,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0.11,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.2,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 0.51,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0.1,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 1.04,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        }
                    ]
                },
                {
                    "id": 2050,
                    "name": "vanilla extract",
                    "amount": 0.06,
                    "unit": "tsp",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 0.03,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 0.39,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 0.03,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0.09,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Folic Acid",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Selenium",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Lycopene",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Zinc",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 0.76,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 0.03,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0.03,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 0.02,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 0.03,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        }
                    ]
                },
                {
                    "id": 99076,
                    "name": "vanilla protein powder",
                    "amount": 0.06,
                    "unit": "scoop",
                    "nutrients": [
                        {
                            "name": "Carbohydrates",
                            "amount": 0.38,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.75
                        },
                        {
                            "name": "Fat",
                            "amount": 0.12,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.28
                        },
                        {
                            "name": "Potassium",
                            "amount": 7.69,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.64
                        },
                        {
                            "name": "Cholesterol",
                            "amount": 3.85,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.42
                        },
                        {
                            "name": "Mono Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Calcium",
                            "amount": 9.61,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.02
                        },
                        {
                            "name": "Alcohol",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 100
                        },
                        {
                            "name": "Vitamin E",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.71
                        },
                        {
                            "name": "Selenium",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.26
                        },
                        {
                            "name": "Zinc",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 3.11
                        },
                        {
                            "name": "Vitamin D",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Trans Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 459.46
                        },
                        {
                            "name": "Vitamin B1",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.39
                        },
                        {
                            "name": "Protein",
                            "amount": 1.2,
                            "unit": "g",
                            "percentOfDailyNeeds": 7.34
                        },
                        {
                            "name": "Calories",
                            "amount": 7.21,
                            "unit": "kcal",
                            "percentOfDailyNeeds": 5.16
                        },
                        {
                            "name": "Magnesium",
                            "amount": 0.77,
                            "unit": "mg",
                            "percentOfDailyNeeds": 6.29
                        },
                        {
                            "name": "Vitamin B5",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.08
                        },
                        {
                            "name": "Poly Unsaturated Fat",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin A",
                            "amount": 0,
                            "unit": "IU",
                            "percentOfDailyNeeds": 0.38
                        },
                        {
                            "name": "Vitamin B3",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.89
                        },
                        {
                            "name": "Vitamin B6",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.43
                        },
                        {
                            "name": "Caffeine",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Vitamin K",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0.35
                        },
                        {
                            "name": "Vitamin B12",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 0
                        },
                        {
                            "name": "Folate",
                            "amount": 0,
                            "unit": "µg",
                            "percentOfDailyNeeds": 2.58
                        },
                        {
                            "name": "Sugar",
                            "amount": 0.1,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.85
                        },
                        {
                            "name": "Copper",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 4.1
                        },
                        {
                            "name": "Fiber",
                            "amount": 0,
                            "unit": "g",
                            "percentOfDailyNeeds": 5.61
                        },
                        {
                            "name": "Sodium",
                            "amount": 4.81,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.36
                        },
                        {
                            "name": "Manganese",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 14.61
                        },
                        {
                            "name": "Phosphorus",
                            "amount": 4.81,
                            "unit": "mg",
                            "percentOfDailyNeeds": 5.34
                        },
                        {
                            "name": "Vitamin B2",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.9
                        },
                        {
                            "name": "Vitamin C",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 1.71
                        },
                        {
                            "name": "Saturated Fat",
                            "amount": 0.05,
                            "unit": "g",
                            "percentOfDailyNeeds": 8.22
                        },
                        {
                            "name": "Net Carbohydrates",
                            "amount": 0.38,
                            "unit": "g",
                            "percentOfDailyNeeds": 3.58
                        },
                        {
                            "name": "Iron",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 2.61
                        },
                        {
                            "name": "Fluoride",
                            "amount": 0,
                            "unit": "mg",
                            "percentOfDailyNeeds": 0
                        }
                    ]
                }
            ],
            "caloricBreakdown": {
                "percentProtein": 13.58,
                "percentFat": 44.8,
                "percentCarbs": 41.62
            },
            "weightPerServing": {
                "amount": 60,
                "unit": "g"
            }
        },
        "summary": "If you want to add more <b>gluten free and dairy free</b> recipes to your repertoire, Watching What I Eat: Peanut Butter Bananan Oat Breakfast Cookies with Carob / Chocolate Chips might be a recipe you should try. This recipe makes 16 servings with <b>103 calories</b>, <b>4g of protein</b>, and <b>5g of fat</b> each. For <b>23 cents per serving</b>, this recipe <b>covers 3%</b> of your daily requirements of vitamins and minerals. This recipe from watching-what-i-eat.blogspot.com has 902934 fans. Head to the store and pick up bananas, vanillan extract, chocolate chips, and a few other things to make it today. It works well as a very affordable morn meal. From preparation to the plate, this recipe takes roughly <b>roughly 45 minutes</b>. With a spoonacular <b>score of 44%</b>, this dish is good. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/peanut-butter-banana-oat-breakfast-cookies-with-carob-chocolate-chips-666592\">Peanut Butter Bananan Oat Breakfast Cookies with Carob/Chocolate Chips</a>, <a href=\"https://spoonacular.com/recipes/peanut-butter-banana-honey-oat-chocolate-chip-cookies-618265\">Peanut Butter, Banana, Honey & Oat Chocolate Chip Cookies</a>, and <a href=\"https://spoonacular.com/recipes/banana-oatmeal-cookies-with-peanut-butter-and-chocolate-chips-203278\">Bananan Oatmeal Cookies with Peanut Butter and Chocolate Chips</a>.",
        "cuisines": [],
        "dishTypes": [
            "morning meal",
            "brunch",
            "breakfast"
        ],
        "diets": [
            "gluten free",
            "dairy free"
        ],
        "occasions": [],
        "analyzedInstructions": [
            {
                "name": "",
                "steps": [
                    {
                        "number": 1,
                        "step": "Preheat heat oven to 350 degrees.In a large bowl, mix mashed banana & peanut butter until completely combined then add in the applesauce, vanilla protein powder & the extract(s) ~ mix again until all are completely combined.",
                        "ingredients": [
                            {
                                "id": 99076,
                                "name": "vanilla protein powder",
                                "localizedName": "vanilla protein powder",
                                "image": "protein-powder-vanilla.png"
                            },
                            {
                                "id": 1009040,
                                "name": "mashed banana",
                                "localizedName": "mashed banana",
                                "image": "bananas.jpg"
                            },
                            {
                                "id": 16098,
                                "name": "peanut butter",
                                "localizedName": "peanut butter",
                                "image": "peanut-butter.png"
                            },
                            {
                                "id": 9019,
                                "name": "applesauce",
                                "localizedName": "applesauce",
                                "image": "applesauce.png"
                            },
                            {
                                "id": 0,
                                "name": "extract",
                                "localizedName": "extract",
                                "image": ""
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404783,
                                "name": "bowl",
                                "localizedName": "bowl",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
                            },
                            {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "step": "Add in the oatmeal & nuts to the banana mixture & combine. (** add the optional carob / chocolate chips at this time if you want them mixed throughout)",
                        "ingredients": [
                            {
                                "id": 99278,
                                "name": "chocolate chips",
                                "localizedName": "chocolate chips",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg"
                            },
                            {
                                "id": 8121,
                                "name": "oatmeal",
                                "localizedName": "oatmeal",
                                "image": "rolled-oats.jpg"
                            },
                            {
                                "id": 9040,
                                "name": "banana",
                                "localizedName": "banana",
                                "image": "bananas.jpg"
                            },
                            {
                                "id": 12135,
                                "name": "nuts",
                                "localizedName": "nuts",
                                "image": "nuts-mixed.jpg"
                            }
                        ],
                        "equipment": []
                    },
                    {
                        "number": 3,
                        "step": "Let dough rest for 10 minutes.Drop cookie dough, by spoonfuls, onto a parchment paper lined cookie sheet & flatten cookies into circles. (** if you just want the carob / chocolate chips on the top of the cookies, add now)",
                        "ingredients": [
                            {
                                "id": 99278,
                                "name": "chocolate chips",
                                "localizedName": "chocolate chips",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg"
                            },
                            {
                                "id": 0,
                                "name": "cookie dough",
                                "localizedName": "cookie dough",
                                "image": ""
                            },
                            {
                                "id": 10118192,
                                "name": "cookies",
                                "localizedName": "cookies",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/shortbread-cookies.jpg"
                            },
                            {
                                "id": 0,
                                "name": "dough",
                                "localizedName": "dough",
                                "image": "pizza-dough"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404770,
                                "name": "baking paper",
                                "localizedName": "baking paper",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/baking-paper.jpg"
                            },
                            {
                                "id": 404727,
                                "name": "baking sheet",
                                "localizedName": "baking sheet",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/baking-sheet.jpg"
                            }
                        ],
                        "length": {
                            "number": 10,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 4,
                        "step": "Bake cookies approx. 20-30 minutes (some like their cookies less cooked, some cooked more - try it both ways to find which works best for your tastes) or until golden brown & done.",
                        "ingredients": [
                            {
                                "id": 10118192,
                                "name": "cookies",
                                "localizedName": "cookies",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/shortbread-cookies.jpg"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
                            }
                        ],
                        "length": {
                            "number": 30,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 5,
                        "step": "Remove from oven & let rest on cookie sheet for 5 minutes, then move to cooling rack. (if you want the traditional fork tong marks on the cookies, use a pizza cutter or sharp knife to score the tops of the cookies while they're still warm)When cookies are completely cool, store in a covered container. Enjoy!...or with a cuppa tea.",
                        "ingredients": [
                            {
                                "id": 10118192,
                                "name": "cookies",
                                "localizedName": "cookies",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/shortbread-cookies.jpg"
                            },
                            {
                                "id": 14355,
                                "name": "tea",
                                "localizedName": "tea",
                                "image": "tea-bags.jpg"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404727,
                                "name": "baking sheet",
                                "localizedName": "baking sheet",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/baking-sheet.jpg"
                            },
                            {
                                "id": 405900,
                                "name": "wire rack",
                                "localizedName": "wire rack",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/wire-rack.jpg"
                            },
                            {
                                "id": 404651,
                                "name": "pizza cutter",
                                "localizedName": "pizza cutter",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/pizza-cutter.jpg"
                            },
                            {
                                "id": 404745,
                                "name": "knife",
                                "localizedName": "knife",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/chefs-knife.jpg"
                            },
                            {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
                            },
                            {
                                "id": 404641,
                                "name": "tongs",
                                "localizedName": "tongs",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/tongs.jpg"
                            }
                        ],
                        "length": {
                            "number": 5,
                            "unit": "minutes"
                        }
                    }
                ]
            }
        ],
        "spoonacularScore": 36.41407775878906,
        "spoonacularSourceUrl": "https://spoonacular.com/watching-what-i-eat-peanut-butter-banana-oat-breakfast-cookies-with-carob-chocolate-chips-945221",
        "usedIngredientCount": 0,
        "missedIngredientCount": 9,
        "missedIngredients": [
            {
                "id": 9040,
                "amount": 2,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "bananas",
                "original": "2 ripe bananas, mashed until smooth & creamy",
                "originalName": "ripe bananas, mashed until smooth & creamy",
                "meta": [
                    "ripe",
                    "mashed"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/bananas.jpg"
            },
            {
                "id": 1014615,
                "amount": 1,
                "unit": "tsp",
                "unitLong": "teaspoon",
                "unitShort": "tsp",
                "aisle": "Baking",
                "name": "butter flavor shortening",
                "original": "1 tsp butter flavor extract ** (optional)",
                "originalName": "butter flavor extract ** (optional)",
                "meta": [],
                "image": "https://img.spoonacular.com/ingredients_100x100/shortening.jpg"
            },
            {
                "id": 10019146,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Baking",
                "name": "chocolate chips",
                "original": "1/4 cup carob or chocolate chips (**optional)",
                "originalName": "carob or chocolate chips (**optional)",
                "meta": [
                    "(**optional)"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/chocolate-chips.jpg"
            },
            {
                "id": 10116098,
                "amount": 0.33333334,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Nut butters, Jams, and Honey",
                "name": "creamy peanut butter",
                "original": "1/3 cup peanut butter - creamy or chunky",
                "originalName": "peanut butter - creamy or chunky",
                "meta": [],
                "image": "https://img.spoonacular.com/ingredients_100x100/peanut-butter.png"
            },
            {
                "id": 12135,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Nuts",
                "name": "nuts",
                "original": "1/4 cup chopped nuts (peanut, walnut, or your favorite)",
                "originalName": "chopped nuts (peanut, walnut, or your favorite)",
                "meta": [
                    "chopped",
                    "your favorite",
                    "(peanut, walnut, or )"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/nuts-mixed.jpg"
            },
            {
                "id": 8121,
                "amount": 1.5,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Cereal",
                "name": "oatmeal",
                "original": "1 1/2 cups quick oatmeal - uncooked (or use old fashioned oats for more oatmeal texture)",
                "originalName": "quick oatmeal - uncooked (or use old fashioned oats for more oatmeal texture)",
                "meta": [
                    "uncooked",
                    "quick",
                    "(or use old fashioned oats f oatmeal texture)"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/porridge-or-cream-of-wheat.png"
            },
            {
                "id": 9019,
                "amount": 0.6666667,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Canned and Jarred",
                "name": "unsweetened applesauce",
                "original": "2/3 cup unsweetened applesauce",
                "originalName": "unsweetened applesauce",
                "meta": [
                    "unsweetened"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/applesauce.png"
            },
            {
                "id": 2050,
                "amount": 1,
                "unit": "tsp",
                "unitLong": "teaspoon",
                "unitShort": "tsp",
                "aisle": "Baking",
                "name": "vanilla extract",
                "original": "1 tsp vanilla extract",
                "originalName": "vanilla extract",
                "meta": [],
                "image": "https://img.spoonacular.com/ingredients_100x100/vanilla-extract.jpg"
            },
            {
                "id": 99076,
                "amount": 1,
                "unit": "scoop",
                "unitLong": "scoop",
                "unitShort": "scoop",
                "aisle": "Health Foods",
                "name": "vanilla protein powder",
                "original": "1 scoop vanilla protein powder ** (can be made without, cookie will just be lower in protein)",
                "originalName": "vanilla protein powder ** (can be made without, cookie will just be lower in protein)",
                "meta": [
                    "(can be made without, cookie will just be lower in protein)"
                ],
                "image": "https://img.spoonacular.com/ingredients_100x100/protein-powder-vanilla.png"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": []
    }]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const findNewRecipe = () => {
    setSelectedRecipeIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= recipes.length) {
        fetchRecipes();
        return 0;
      } else {
        return nextIndex;
      }
    });
  };

  useEffect(() => {
    fetchRecipes(true);
  }, [filters]);

  const recipe = recipes[selectedRecipeIndex];
  console.log('Recipe:', JSON.stringify(recipe));

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No recipes found with those filters</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
            <Text>Find New Recipe</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (

    <SafeAreaView style={styles.container}>
      <RecipeInfo recipe={recipe} />
      
      <TouchableOpacity style={styles.findNewRecipe} onPress={() => findNewRecipe()}>
        {/* <Icon name="refresh-outline" size={30} color="#fff" /> */}
        <Text style={styles.findNewRecipeText}>Find New Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  findNewRecipe: {
    marginTop: 20, // Adds spacing from other content
    paddingVertical: 14, // Larger vertical padding for better touch target
    paddingHorizontal: 20, // Horizontal padding for better spacing
    borderRadius: 25, // Rounded edges for a modern look
    minWidth: 200,
    width: '80%', // Ensure consistent width
    alignSelf: 'center', // Center the button
    alignItems: 'center', // Center text/content inside the button
    justifyContent: 'center', // Ensure the text is centered
    backgroundColor: '#FF5A5F', // Modern, vibrant color
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow effect for Android
    marginBottom: 5,
  },
  findNewRecipeText: {
    color: '#fff', // White text for contrast
    fontSize: 16, // Medium size for readability
    fontWeight: 'bold', // Bold text for emphasis
    letterSpacing: 1, // Slight letter spacing for a modern touch
  },

});

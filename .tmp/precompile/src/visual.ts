
import DataViewUtils = powerbi.extensibility.utils.dataview;
//import ConverterHelper = powerbi.extensibility.utils.dataview.converterHelper;
//import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;
//import DataViewObject = powerbi.extensibility.utils.dataview.DataViewObject;
//import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;
//import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

module powerbi.extensibility.visual.powerBIPrintButton3925D33A881F43DB8F6511F7564627B2  {

    export interface CategoryViewModel {
        identity: string;
        value: string;
    }

    export interface GroupingViewModel {
    }

    export interface ValueViewModel {
        values: any[];
    }

    export interface ViewModel {
        categories: CategoryViewModel[];
        values: ValueViewModel[];
    }
    
    export class Visual implements IVisual {
        
        private settings: VisualSettings;

        private imprimanteButton: HTMLButtonElement;
        
        constructor(options: VisualConstructorOptions) {



            this.imprimanteButton = document.createElement('button');
            this.imprimanteButton.textContent = "Click to Print";
            this.imprimanteButton.onclick = function(){
                console.log("Imprimante Button Onclick Constructor");
            }
            
            options.element.appendChild(this.imprimanteButton);
            
        }

        public update(options: VisualUpdateOptions) {
            console.log("Update Function");

            //console.log(options.dataViews);

            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

            this.imprimanteButton.onclick = function () {
                console.log("Imprimante Button Onclick Update");


                console.log(options.dataViews[0].categorical.categories[0].objects);

                //console.log("DataView");

                //console.log(options.dataViews[0]);

                //console.log("Categories");

                //console.log(options.dataViews[0].categorical.categories);

                options.dataViews[0].categorical.categories.forEach(function (value: DataViewCategoryColumn, index: number, array: DataViewCategoryColumn[]) {
                    //console.log(index + " : " + value.source.displayName);
                    value.values.forEach(function (value: PrimitiveValue, index: number, array: PrimitiveValue[]) {
                        //console.log(index + " : " + value);
                        
                    });
                });
                
                //console.log("Values");
                //console.log(options.dataViews[0].categorical.values);

                options.dataViews[0].categorical.values.forEach(function (value: DataViewValueColumn, index: number, array: DataViewValueColumn[]) {
                    //console.log(index);
                    //console.log(value);
                });

                //options.dataViews[0].categorical.values.forEach(function (value: DataViewValueColumn, index: number, array: DataViewValueColumn[]) {
                //    console.log(value);
                //    console.log(index);
                //    console.log(array);

                //    console.log(index + " : " + value.source.displayName);
                //});

                


                //options.dataViews[0].categorical.values.forEach(function (value: DataViewValueColumn, index: number, array: DataViewValueColumn[]) {
                //    console.log(value);
                //    console.log(index);
                //    console.log(array);
                //});


                //var viewModel = Visual.converter(options.dataViews[0]);
                //console.log(viewModel);
                
                //console.log(viewModel);

                //var data = [];
                //for (var i in viewModel.categories) {
                //    var dataPoint = {
                //        cat: viewModel.categories[i].value,
                //        val: viewModel.values[i].values[0]
                //    };
                //    data.push(dataPoint);
                //}

                //console.log(data);
                
                //Visual.PDFExport(options.dataViews[0]);
            }


        }
        
        public static converter(dataView: DataView): ViewModel {
            var viewModel: ViewModel = {
                categories: [],
                values: []
            }
            if (dataView) {
                var categorical = dataView.categorical;
                if (categorical) {
                    var categories = categorical.categories;
                    var series = categorical.values;
                    var formatString = dataView.metadata.columns[0].format;

                    //console.log(categories);
                    //console.log(series);
                    //console.log(formatString);

                    if (categories && series && categories.length > 0 && series.length > 0) {
                        for (var i = 0, catLength = categories[0].values.length; i < catLength; i++) {
                            viewModel.categories.push({ value: categories[0].values[i].toString(), identity: '' })

                            for (var k = 0, seriesLength = series.length; k < seriesLength; k++) {
                                var value = series[k].values[i];
                                if (k == 0) {
                                    viewModel.values.push({ values: [] });
                                }
                                viewModel.values[i].values.push(value);
                            }
                        }
                    }
                }
            }

            return viewModel;
        }

        private static PDFExport(dataView: DataView) {
            console.log("PDF Export Function");

            console.log("Dataview");
            console.log(dataView);

            console.log("Categories");
            console.log(dataView.categorical.categories)
            
            console.log("Series");
            console.log(dataView.categorical.values);



        }


        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }
        
        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }

    }
}
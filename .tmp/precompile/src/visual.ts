
//import dataViewUtils = powerbi.extensibility.utils.dataview;
//import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

//import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;
//import DataViewObject = powerbi.extensibility.utils.dataview.DataViewObject;
//import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;
//import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

import powow =  powerbi.extensibility.visual;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


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

    export interface tableModel {
        columnHeaders: string[];
        rows: string[][];
    }

    export interface tableRowModel {
        columnValues: string[];
    }
    
    export class Visual /*implements IVisual*/ {
        
        private settings: VisualSettings;
        
        private imprimanteButton: HTMLButtonElement;

        private tableModel: tableModel;
        
        constructor(options: VisualConstructorOptions) {
            
            console.log("Constructor Function");
            
            this.imprimanteButton = document.createElement('button');
            this.imprimanteButton.textContent = "Click to Print";
            this.imprimanteButton.onclick = function(){
                console.log("Imprimante Button Onclick Constructor Function");
            }
            
            options.element.appendChild(this.imprimanteButton);
            
        }

        public update(options: VisualUpdateOptions) {
            
            console.log("Update Function");
            
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

            console.log("DataView");
            console.log(options.dataViews[0]);
            
            //let columnHeaders: string[];
            //let tableRowsModel: tableRowModel[];
            //let tableRows: string[][];
            //let tableRowsValues: string[];
            //let emptyRowValues: string[];

            //console.log("Table Columns");

            /*
            options.dataViews[0].table.columns.forEach(function (value: DataViewMetadataColumn, index: number, array: DataViewMetadataColumn[]) {
                console.log(value.displayName.toString());
                
                console.log(columnHeaders.push(value.displayName.toString()));
                
                console.log("Wat");
            });
            */

            //this.tableModel.columnHeaders = columnHeaders;
            //console.log("TableColumns");
            //console.log(this.tableModel.columnHeaders);

            /*
            options.dataViews[0].table.rows.forEach(function (row: DataViewTableRow, index: number, array: DataViewTableRow[]) {
                
                row.forEach(function (value: PrimitiveValue, index: number, array: PrimitiveValue[]) {
                    tableRowsValues.push(value.toString());
                    if (index == (array.length - 1)) {
                        tableRows.push(tableRowsValues);
                        tableRowsValues = emptyRowValues;
                    }
                });
            });
            */

            //this.tableModel.rows = tableRows;
            //console.log("TableRows");
            //console.log(this.tableModel.rows);

            //console.log("TableModel");
            //console.log(this.tableModel);
            
            let viewModel: ViewModel = Visual.converter(options.dataViews[0]);
            console.log(viewModel);

            this.imprimanteButton.onclick = function () {
                console.log("Imprimante Button Onclick Update Function");
                
                //console.log(options.dataViews[0]);

                /*
                options.dataViews[0].categorical.categories.forEach(function (value: DataViewCategoryColumn, index: number, array: DataViewCategoryColumn[]) {
                    //console.log(index + " : " + value.source.displayName);
                    value.values.forEach(function (value: PrimitiveValue, index: number, array: PrimitiveValue[]) {
                        //console.log(index + " : " + value);
                    });
                });
                
                options.dataViews[0].categorical.values.forEach(function (value: DataViewValueColumn, index: number, array: DataViewValueColumn[]) {
                    //console.log(index);
                    //console.log(value);
                });
                */
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
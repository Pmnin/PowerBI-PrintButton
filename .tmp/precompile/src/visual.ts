
module powerbi.extensibility.visual.powerBIPrintButton3925D33A881F43DB8F6511F7564627B2  {

    //import printSymbol from '../assets/imprimante24x24.svg';

    export class Visual implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;

        private svgRoot: d3.Selection<SVGElementInstance>;
        private ellipse: d3.Selection<SVGElementInstance>;
        private image: d3.Selection<SVGElementInstance>;
        private padding: number = 20;


        constructor(options: VisualConstructorOptions) {
            /*
            this.target = options.element;
            if (typeof document !== "undefined") {
                const new_p: HTMLElement = document.createElement("p");
                new_p.appendChild(document.createTextNode("Test CSMV"));
                this.target.appendChild(new_p);
            }
            */
            
            this.svgRoot = d3.select(options.element).append("svg");
            this.ellipse = this.svgRoot.append("ellipse").style("fill", "rgba(255,255,0,0.5)").style("stroke", "rgba(0, 0, 0, 1.0)").style("stroke-width", "4");


        }

        public update(options: VisualUpdateOptions) {
            console.log("Update Function");

            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            
            this.svgRoot.attr("width", options.viewport.width).attr("height", options.viewport.height);

            var plot = {
                xOffset: this.padding,
                yOffset: this.padding,
                width: options.viewport.width - (this.padding * 2),
                height: options.viewport.height - (this.padding * 2)
            };

            this.ellipse.attr("cx", plot.xOffset + (plot.width * 0.5)).attr("cy", plot.yOffset + (plot.height * 0.5)).attr("rx", (plot.width * 0.5)).attr("ry", (plot.height * 0.5));

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
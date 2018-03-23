# PowerBI-PrintButton

## Description
Visuel personnalisé réalisé en Typescript avec les outils de conception de visuels de Microsoft
Génération de PDFs à partir de matrices ou de listes de données provenant de rapports Power BI

À l'appui du bouton du visuel, transforme une liste ou une matrice de données en format PDF
Possibilité de modifier les données à partir de l'espace de travail (modification des champs utilisés dans les listes) ou utilisation de filtres (slicers) pour spécifier les données voulues.

Utilise PDFMake pour la génération des PDFs, mais crée des erreurs en Typescript dû au module Javascript non référencé en Typescript (en développement...)

## References
[Application Power BI](https://app.powerbi.com)
[Power BI Blog](https://powerbi.microsoft.com/en-us/blog/)

[Power BI Visuals](https://github.com/Microsoft/powerbi-visuals)
[Power BI Visuals SampleSlicer](https://github.com/Microsoft/powerbi-visuals-sampleslicer)

[PDFMake](https://github.com/bpampuch/pdfmake)
[Définitions des types (d.ts) Typescript pour PDFMake](https://github.com/bpampuch/pdfmake/issues/525)
[Ajout des définitions de types Typescript pour PDFMake dans @types](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23555)


import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
/**Import css style*/
import "./../style/visual.less";
/**Omdat standaard Power BI TypeScript-instellingen niet worden herkend React tsx-bestanden
 * Als u het onderdeel wilt weergeven, voegt u het HTML-doelelement toe aan visual.ts. Dit element bevindt zich
 * HTMLElement in VisualConstructorOptions, dat wordt doorgegeven aan de constructor.*/
export declare class Visual implements IVisual {
    private target;
    private reactRoot;
    private viewport;
    constructor(options: VisualConstructorOptions);
    /**Uw visual instellen op het ontvangen van gegevens
     *
     * Visuals ontvangen gegevens als argument van de update methode. In deze sectie werkt u deze
     * methode bij om gegevens te ontvangen.*/
    update(options: VisualUpdateOptions): void;
    private clear;
}

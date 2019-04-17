import {Compiler, Component, Injector, ViewChild, ViewContainerRef} from "@angular/core";
import {LACLazyModule} from "./lac-lazy.module";

@Component({
    
    selector: 'lac-a-component',
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})

export class LACAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    constructor(private _compiler: Compiler, private _injector: Injector) {

    }

    ngAfterViewInit() {
            this._compiler.compileModuleAndAllComponentsAsync(LACLazyModule)
                .then((compiled) => {
                    const factory = compiled.componentFactories[0];
                    this._container.createComponent(factory);
                })
    }
}

import { Module, Type } from "@nestjs/common";
import { 
    ScraperFactory,
    JsonPathParser,
    JsonObjectTraverserFactory,
    SelectorComparer,
    CssSelectorParser,
    DomTraverserFactory 
} from '@cassowary/data-scraper'

function provider(provide: string, useClass: Type<any>) {
    return {
        provide,
        useClass
    }
}

@Module({
    providers: [
        JsonPathParser,
        CssSelectorParser,
        SelectorComparer,
        JsonObjectTraverserFactory,
        DomTraverserFactory,
        {
            provide: 'JsonScraperFactory',
            useFactory: (selectorParser, selectorComparer, traverserFactory) => new ScraperFactory(selectorParser, selectorComparer, traverserFactory),
            inject: [
                JsonPathParser,
                SelectorComparer,
                JsonObjectTraverserFactory
            ]
        },
        {
            provide: 'HtmlScraperFactory',
            useFactory: (selectorParser, selectorComparer, traverserFactory) => new ScraperFactory(selectorParser, selectorComparer, traverserFactory),
            inject: [
                CssSelectorParser,
                SelectorComparer,
                DomTraverserFactory
            ]
        }
    ],
    exports: [
        'JsonScraperFactory',
        'HtmlScraperFactory'
    ]
})
export class ScraperModule { }
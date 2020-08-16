import { ScraperModule } from "./scraper.module"
import { Test, TestingModule } from "@nestjs/testing"
import { ScraperFactory } from "@cassowary/data-scraper"
import { ScraperOptions } from "@cassowary/data-scraper/dist/types"

describe('Scraper Module', () => {
    let scraperModule: TestingModule
    beforeAll(async () => {
        scraperModule = await Test.createTestingModule({
            imports: [ScraperModule]
        }).compile()
    })

    it('resolves Json Scraper Factory', async () => {
        const factory = await scraperModule.resolve('JsonScraperFactory')
        expect(factory).not.toBeNull()
    })

    it('resolves Html Scraper Factory', async () => {
        const factory = await scraperModule.resolve('HtmlScraperFactory')
        expect(factory).not.toBeNull()
    })

    describe('Json Scraper Factory', () => {
        it('creates Json Scraper', async () => {
            const factory: ScraperFactory = await scraperModule.resolve('JsonScraperFactory')
            const scraper = factory.create({ scrape: {} })
            expect(scraper).not.toBeNull()
        })

        describe('Json Scraper', () => {
            it('scrapes json object', async () => {
                const config: ScraperOptions = {
                    scrape: {
                        'prop1': {
                            selector: 'parent.source1'
                        }
                    }
                }
                const source = {
                    parent: {
                        source1: 'value1'
                    }
                }
                const target = {
                    prop1: 'value1'
                }
                const factory: ScraperFactory = await scraperModule.resolve('JsonScraperFactory')
                const scraper = factory.create(config)
                expect(scraper.scrape(source)).toEqual(target)
            })
        })
    })


    describe('Html Scraper Factory', () => {
        it('creatas Html Scraper', async () => {
            const factory: ScraperFactory = await scraperModule.resolve('HtmlScraperFactory')
            const scraper = factory.create({ scrape: {} })
            expect(scraper).not.toBeNull()
        })

        describe('Html Scraper', () => {
            it('scrapes dom object', async () => {
                const config: ScraperOptions = {
                    scrape: {
                        'prop1': {
                            selector: 'h1',
                            method: 'text'
                        }
                    }
                }
                const source = `
                <html>
                    <body>
                        <h1>Header 1</h1>
                    </body>
                </html>`
                const target = {
                    prop1: 'Header 1'
                }
                const factory: ScraperFactory = await scraperModule.resolve('HtmlScraperFactory')
                const scraper = factory.create(config)
                expect(scraper.scrape(source)).toEqual(target)
            })
        })
    })
})
import {createPath} from './common';

describe('createPath', ()=>{
    test('not or null params', ()=>{
        expect(createPath(null, null, null)).toBe('')
        expect(createPath(null, null)).toBe('')
        expect(createPath(null)).toBe('')
        expect(createPath()).toBe('')
    })
    test('exists param sort', ()=>{
        expect(createPath('["name","ASC"]')).toBe('?sort=["name","ASC"]')
        expect(createPath('["name","ASC"]', '[0,24]')).toBe('?sort=["name","ASC"]&range=[0,24]')
        expect(createPath('["name","ASC"]', '[0,24]','{"category_id":20}')).toBe('?sort=["name","ASC"]&range=[0,24]&filter={"category_id":20}')
    })
    test('exists param range', ()=>{
        expect(createPath(null, '[0,24]')).toBe('?range=[0,24]')
        expect(createPath(null, '[0,24]','{"category_id":20}')).toBe('?range=[0,24]&filter={"category_id":20}')
    })
    test('exists param filter', ()=>{
        expect(createPath(null, null,'{"category_id":20}')).toBe('?filter={"category_id":20}')
        expect(createPath('["name","ASC"]', null,'{"category_id":20}')).toBe('?sort=["name","ASC"]&filter={"category_id":20}')
    })
})

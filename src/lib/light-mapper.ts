import { LightMapperRunner } from './light-mapper-runner';
import { MapperCallBack, IAssocAny } from './light-mapper.types';

export class LightMapper {

    public replace(prop: string, value: any): LightMapperRunner {
        const runner = new LightMapperRunner();
        runner.replace(prop, value);
        return runner;
    }

    public transform(
        prop: string,
        transformator: MapperCallBack
    ): LightMapperRunner {
        const runner = new LightMapperRunner();
        runner.transform(prop, transformator);
        return runner;
    }

    public map<T>(
        target: new () => T,
        source: IAssocAny,
        exclude?: string[]
    ): T {
        return new LightMapperRunner().map<T>(target, source, exclude);
    }

    public getDescription<T = any>(target: new () => T): { name: string, field: string }[] {
        return new LightMapperRunner().getDescription<T>(target);
    }
}

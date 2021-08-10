## LightMapper ![example workflow](https://github.com/HT14X/light-mapper/actions/workflows/main.yml/badge.svg) [![npm version](https://badge.fury.io/js/%40ht14x%2Flight-mapper.svg)](https://badge.fury.io/js/%40ht14x%2Flight-mapper)

Advanced object mapping tool, especially useful for third-party object mapping and transformation.

### Install

`npm install @ht14x/light-mapper`

### Documentation

-   #### Mapping decorator `@Mapping`

    ##### REQUIRED mapping

    ```typescript
    // Target object
    class Target {
        @Mapping(MappingRequirement.REQUIRED)
        property: any;
    }
    // Source object
    class Source {
        property = "value";
    }

    const target: Target = new LightMapper().map<Target>(Target, new Source());
    console.log(target); // Target { property: 'value' }
    ```

    ##### NULLABLE mapping

    ```typescript
    // Target object
    class Target {
        @Mapping(MappingRequirement.NULLABLE)
        property: any;
    }
    // Source object
    class Source {}

    const target: Target = new LightMapper().map<Target>(Target, new Source());
    console.log(target); // Target { property: null }
    ```

    ##### OPTIONAL mapping

    ```typescript
    // Target object
    class Target {
        @Mapping(MappingRequirement.OPTIONAL)
        property: any;
    }
    // Source object
    class Source {}

    const target: Target = new LightMapper().map<Target>(Target, new Source());
    console.log(target); // Target {}
    ```

-   #### Mapping options `MappingOpts`

    ```typescript
    export interface MappingOpts<T = any> {
        requirement: MappingRequirement;
        from?: string | string[]; // from which property of the source object is to be mapped
        name?: string; // name for getDescription()
        config?: T; // config for getDescription()
        transformation?: (value: any) => any; // transfrom function before map
    }
    ```

    ##### `from` option

    ```typescript
    // Target object
    class Target {
        @Mapping({
            requirement: MappingRequirement.OPTIONAL,
            from: "sourceProperty", // or from: ["sourceA", "sourceB"]
        })
        property: any;
    }
    // Source object
    class Source {
        sourceProperty = "value";
    }

    const target: Target = new LightMapper().map<Target>(Target, new Source());
    console.log(target); // Target { property: 'value' }
    ```

    ##### `transformation` option

    ```typescript
    // Target object
    class Target {
        @Mapping({
            requirement: MappingRequirement.OPTIONAL,
            transformation: (value: any) => {
                return `${value} - transformed`;
            },
        })
        property: any;
    }
    // Source object
    class Source {
        property = "value";
    }

    const target: Target = new LightMapper().map<Target>(Target, new Source());
    console.log(target); // Target { property: 'value - transformed' }
    ```

    ##### `name` & `config` option

    ```typescript
    // Target object
    class Target {
        @Mapping({
            requirement: MappingRequirement.OPTIONAL,
            name: "Property Label",
            config: { custom: "params" },
        })
        property: any;
    }

    const description = new LightMapper().getDescription<Target>(Target);
    console.log(description);
    /*
        [
            {
                name: 'Property Label',
                field: 'property',
                config: { custom: 'params' }
            }
        ]
    */
    ```

-   #### Inline `transform`

    ```typescript
    // Target object
    class Target {
        @Mapping(MappingRequirement.REQUIRED)
        property: any;
    }
    // Source object
    class Source {
        property = "value";
    }

    const target: Target = new LightMapper()
        .transform("property", (value) => `${value} transform inline`)
        .map<Target>(Target, new Source());
    console.log(target); // Target { property: 'value transform inline' }
    ```

-   #### Inline `replace`

    ```typescript
    // Target object
    class Target {
        @Mapping(MappingRequirement.REQUIRED)
        property: any;
    }
    // Source object
    class Source {
        property = "value";
    }

    const target: Target = new LightMapper()
        .replace("property", "replaced property value inline")
        .map<Target>(Target, new Source());
    console.log(target); // Target { property: 'replaced property value inline' }
    ```

### Contants

##### email: hajekj14@gmail.com

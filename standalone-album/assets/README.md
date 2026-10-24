# Assets - Vajillas (Eventos Arce)

Esta carpeta está ubicada en `public/assets/vajillas/` y permite que las imágenes sean servidas de forma estática y directa a través de rutas absolutas (ideal para `catalogo.json` y componentes de la web).

## Estructura de Divisiones

```
public/assets/vajillas/
├── platos/                 # Platos base (bajo platos), trinche, hondos, postre y pan
├── cristaleria/            # Copas de agua, vino tinto/blanco, espumantes y vasos
├── cubiertos/              # Juegos de cubiertos (dorados, plata, negro, postre)
├── cafeteria/              # Tazas de café/té, platillos, teteras y azucareros
└── fuentes-complementos/   # Fuentes de servir, bandejas, salseras y accesorios
```

## Cómo referenciar en `catalogo.json`
Al colocar las imágenes aquí, la URL que debes usar en `catalogo.json` es:
```json
{
  "id": 8,
  "nombre": "Vajilla Porcelana Borde Dorado Real",
  "categoria": "Vajilla",
  "imagen": "/assets/vajillas/platos/vajilla-borde-dorado.jpg"
}
```

## Recomendaciones para las imágenes
- **Formatos sugeridos:** `.webp`, `.jpg`, `.png`
- **Nomenclatura sugerida:** nombres en minúscula con guiones (ej. `copa-labrada-ambar-01.webp`, `plato-base-dorado-01.webp`)
- **Resolución recomendada:** 1200x800 px o superior para el visor lightbox.

import { useRef, useEffect, useState } from 'react';
import axios from "axios";

interface MapRestoProps {
    widthdiv: number;
    heightdiv: number;
}

export const MapResto = ({widthdiv, heightdiv}: MapRestoProps) => {

    const [size, setSize] = useState({ width: 0, height: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tables, setTables] = useState<Array<{ id: number; ex_x: number; ex_y: number; x: number; y: number; width: number; height: number; rotation: number }>>([]);

    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);

    const [prevMouseX, setPrevMouseX] = useState<number | null>(null);
    const [prevMouseY, setPrevMouseY] = useState<number | null>(null);
    const [mouseDirection, setMouseDirection] = useState<string>("");

    const [colorTable, setColorTable] = useState<string>("#341A08");
    const [colorBack, setColorBack] = useState<string>("#8c6248");
    const [colorBack2, setColorBack2] = useState<string>("#4a3426");

    const fetchTables = async () => {
        return (await axios.get(`http://localhost:5000/tablesdetails`)).data;
    };

    const drawBack = (ctx: CanvasRenderingContext2D) => {
        const nb_planche = 15;
        const nb_planche2 = 2;
        ctx.fillStyle = colorBack;
        ctx.fillRect(0, 0, size.width, size.height);

        ctx.fillStyle = colorBack2;
        for(var i = 0; i < nb_planche + 1; i++){
            ctx.fillRect(0, i*size.height/nb_planche - 1, size.width, 2);
        }

        ctx.fillStyle = colorBack2;
        for(var i = 0; i < nb_planche + 1; i++){
            for(var j = 0; j < nb_planche2 + 1; j++){
                ctx.fillRect(i%2*size.width/(nb_planche2*2) + j*size.width/nb_planche2 - 1, i*size.height/nb_planche, 2, size.height/nb_planche);
            }
        }
    }

    useEffect(() => {
        if(widthdiv > heightdiv*1.61803){
            setSize({ width: heightdiv*1.61803,
                      height: heightdiv });
        }else{
            setSize({ width: widthdiv, 
                      height: widthdiv/1.61803 });
        }
    }, []);

    useEffect(() => {
        const fetchdata = async () => {

            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // Dessinez votre salle et vos tables ici
                    // Exemple : salle bleue et deux tables brunes
                    drawBack(ctx);

                    const taille_tables = 20;
                    const recup_tables = await fetchTables();
                    const initialTables: Array<{ id: number; ex_x: number; ex_y: number; x: number; y: number; width: number; height: number; rotation: number }> = [];
                                                    
                    recup_tables.forEach((table: any) => {
                        initialTables.push({ id: table.id, 
                                            ex_x: (table.x*0.9/2+0.5) * canvas.width - table.taille*taille_tables/4,
                                            ex_y: (table.y*0.9/2+0.5) * canvas.height - taille_tables/2,
                                            x: (table.x*0.9/2+0.5) * canvas.width - table.taille*taille_tables/4, 
                                            y: (table.y*0.9/2+0.5) * canvas.height - taille_tables/2, 
                                            width: taille_tables*table.taille/2, 
                                            height: taille_tables,
                                            rotation: table.rotation * Math.PI / 180 });
                    });

                    // const initialTables = [
                    //     { id: 1, x: 100, y: 100, width: 50, height: 50 },
                    //     { id: 2, x: 300, y: 200, width: 50, height: 50 },
                    //     // ... Autres tables
                    // ];

                    setTables(initialTables);

                    // Gérer le déplacement des tables (à ajouter)
                    // Vous pouvez utiliser des événements onMouseDown, onMouseMove, onMouseUp ici pour détecter et gérer le déplacement des tables
                }
            }
        };

        fetchdata();
    }, [size]);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                
                drawBack(ctx);

                ctx.fillStyle = colorTable;

                tables.forEach((table: { id: number; ex_x: number; ex_y: number; x: number; y: number; width: number; height: number; rotation: number }) => {
                    ctx.translate(table.x + table.width/2, table.y + table.height/2);
                    ctx.rotate(table.rotation);
                    ctx.translate(-table.width/2, -table.height/2);
                    ctx.fillRect(0, 0, table.width, table.height);
                    ctx.translate(table.width/2, table.height/2);
                    ctx.rotate(-table.rotation);
                    ctx.translate(-(table.x + table.width/2), -(table.y + table.height/2));
                });
            }
        }
    }, [tables]);

    const isInsideRotatedRect = (
        mouseX: number,
        mouseY: number,
        rectX: number,
        rectY: number,
        rectWidth: number,
        rectHeight: number,
        rotation: number
    ): boolean => {
        // Transformer les coordonnées de la souris en coordonnées locales par rapport au centre de la table
        const localMouseX = mouseX - (rectX + rectWidth / 2);
        const localMouseY = mouseY - (rectY + rectHeight / 2);
    
        // Appliquer la transformation inverse de la rotation pour revenir à une orientation non tournée
        const cosRotation = Math.cos(-rotation);
        const sinRotation = Math.sin(-rotation);
        const rotatedMouseX = localMouseX * cosRotation - localMouseY * sinRotation + rectWidth / 2;
        const rotatedMouseY = localMouseX * sinRotation + localMouseY * cosRotation + rectHeight / 2;

        const localCenterX = rectWidth;
        const localCenterY = rectHeight;

        // Vérifier si la souris est à l'intérieur du rectangle tourné
        return (
            0 < rotatedMouseX && rotatedMouseX < localCenterX &&
            0 < rotatedMouseY && rotatedMouseY < localCenterY
        );
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const mouseX = event.nativeEvent.offsetX;
        const mouseY = event.nativeEvent.offsetY;

        // Vérifier si la souris est sur une table
        tables.forEach(table => {
            if (isInsideRotatedRect(
                mouseX,
                mouseY,
                table.x,
                table.y,
                table.width,
                table.height,
                table.rotation
            )) {
                setSelectedTable(table.id);
                setOffsetX(mouseX - table.x);
                setOffsetY(mouseY - table.y);
            }
        });
    };

    const isTableOut = (table: { id: number; x: number; y: number; x_table: number, y_table: number; width: number; height: number; rotation: number }): number => {
        const cosRotation = Math.cos(table.rotation);
        const sinRotation = Math.sin(table.rotation);

        const rotatedTopLeftX = - table.width / 2;
        const rotatedTopLeftY = - table.height / 2;
        const rotatedTopRightX = + table.width / 2;
        const rotatedTopRightY = - table.height / 2;
        const rotatedBottomLeftX = - table.width / 2;
        const rotatedBottomLeftY = + table.height / 2;
        const rotatedBottomRightX = + table.width / 2;
        const rotatedBottomRightY = + table.height / 2;

        // console.log("coord table", table.x_table, table.y_table);

        const rotatedPoints = [
            { x: rotatedTopLeftX * cosRotation - rotatedTopLeftY * sinRotation + table.x_table, 
              y: rotatedTopLeftX * sinRotation + rotatedTopLeftY * cosRotation + table.y_table},
            { x: rotatedTopRightX * cosRotation - rotatedTopRightY * sinRotation + table.x_table, 
              y: rotatedTopRightX * sinRotation + rotatedTopRightY * cosRotation + table.y_table },
            { x: rotatedBottomLeftX * cosRotation - rotatedBottomLeftY * sinRotation + table.x_table, 
              y: rotatedBottomLeftX * sinRotation + rotatedBottomLeftY * cosRotation + table.y_table },
            { x: rotatedBottomRightX * cosRotation - rotatedBottomRightY * sinRotation + table.x_table, 
              y: rotatedBottomRightX * sinRotation + rotatedBottomRightY * cosRotation + table.y_table},
        ];

        // console.log(rotatedPoints);

        for(var i = 0; i < rotatedPoints.length; i++){
            if(rotatedPoints[i].x <= 0){
                return 0;
            }
            if(rotatedPoints[i].x >= size.width){
                return 1;
            }
            if(rotatedPoints[i].y <= 0){
                return 2;
            }
            if(rotatedPoints[i].y >= size.height){
                return 3;
            }
        }
        return -1;
    };

    const newDelimitation = (table: { id: number; x: number; y: number; x_table: number, y_table: number; width: number; height: number; rotation: number }): {x: number, y: number} => {
        const cosRotation = Math.cos(table.rotation);
        const sinRotation = Math.sin(table.rotation);

        const rotatedTopLeftX = - table.width / 2;
        const rotatedTopLeftY = - table.height / 2;
        const rotatedTopRightX = + table.width / 2;
        const rotatedTopRightY = - table.height / 2;
        const rotatedBottomLeftX = - table.width / 2;
        const rotatedBottomLeftY = + table.height / 2;
        const rotatedBottomRightX = + table.width / 2;
        const rotatedBottomRightY = + table.height / 2;

        // console.log("coord table", table.x_table, table.y_table);

        const rotatedPoints = [
            { x: rotatedTopLeftX * cosRotation - rotatedTopLeftY * sinRotation + table.x_table, 
              y: rotatedTopLeftX * sinRotation + rotatedTopLeftY * cosRotation + table.y_table},
            { x: rotatedTopRightX * cosRotation - rotatedTopRightY * sinRotation + table.x_table, 
              y: rotatedTopRightX * sinRotation + rotatedTopRightY * cosRotation + table.y_table },
            { x: rotatedBottomLeftX * cosRotation - rotatedBottomLeftY * sinRotation + table.x_table, 
              y: rotatedBottomLeftX * sinRotation + rotatedBottomLeftY * cosRotation + table.y_table },
            { x: rotatedBottomRightX * cosRotation - rotatedBottomRightY * sinRotation + table.x_table, 
              y: rotatedBottomRightX * sinRotation + rotatedBottomRightY * cosRotation + table.y_table},
        ];

        const maxX = Math.max(rotatedPoints[0].x, rotatedPoints[1].x, rotatedPoints[2].x, rotatedPoints[3].x);
        const minX = Math.min(rotatedPoints[0].x, rotatedPoints[1].x, rotatedPoints[2].x, rotatedPoints[3].x);
        const maxY = Math.max(rotatedPoints[0].y, rotatedPoints[1].y, rotatedPoints[2].y, rotatedPoints[3].y);
        const minY = Math.min(rotatedPoints[0].y, rotatedPoints[1].y, rotatedPoints[2].y, rotatedPoints[3].y);

        return {x: maxX - minX, y : maxY - minY};
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (selectedTable !== null) {
            const mouseX = event.nativeEvent.offsetX;
            const mouseY = event.nativeEvent.offsetY;

            // afficher de quel sens se deplace la souris

            if (prevMouseX !== null && prevMouseY !== null) {
                const deltaX = mouseX - prevMouseX;
                const deltaY = mouseY - prevMouseY;
    
                if (deltaX > 0) {
                    setMouseDirection("De gauche à droite");
                } else if (deltaX < 0) {
                    setMouseDirection("De droite à gauche");
                } else if (deltaY > 0) {
                    setMouseDirection("De haut en bas");
                } else if (deltaY < 0) {
                    setMouseDirection("De bas en haut");
                } else {
                    setMouseDirection("Aucun déplacement");
                }
            }

            //console.log(mouseDirection);

            setPrevMouseX(mouseX);
            setPrevMouseY(mouseY);
    
            const updatedTables = tables.map(table => {
                if (table.id === selectedTable) {
                    // console.log(mouseX - offsetX, mouseY - offsetY);
                    const delimitation = newDelimitation({ id: table.id, 
                                    x: mouseX - offsetX, 
                                    y: mouseY - offsetY, 
                                    x_table: table.x + table.width/2,
                                    y_table: table.y + table.height/2,
                                    width: table.width, 
                                    height: table.height, 
                                    rotation: table.rotation })
                    switch(isTableOut({ id: table.id, 
                        x: mouseX - offsetX, 
                        y: mouseY - offsetY, 
                        x_table: table.x + table.width/2,
                        y_table: table.y + table.height/2,
                        width: table.width, 
                        height: table.height, 
                        rotation: table.rotation })){
                        case 0:
                            if(mouseDirection === "De droite à gauche"){
                                console.log("de droite à gauche");
                                return {
                                    ...table,
                                    x: table.x,
                                    y: mouseY - offsetY,
                                };
                            }else if(mouseDirection === "De gauche à droite"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX < 0 ? table.x : mouseX - offsetX,
                                    y: mouseY - offsetY,
                                };
                            };
                            break;
                        case 1:
                            if(mouseDirection === "De gauche à droite"){
                                return {
                                    ...table,
                                    x: table.x,
                                    y: mouseY - offsetY,
                                };
                            }else if(mouseDirection === "De droite à gauche"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX > size.width ? table.x : mouseX - offsetX,
                                    y: mouseY - offsetY,
                                };
                            }
                            break;
                        case 2:
                            if(mouseDirection === "De bas en haut"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX,
                                    y: table.y,
                                };
                            }else if(mouseDirection === "De haut en bas"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX,
                                    y: mouseY - offsetY < 0 ? table.y : mouseY - offsetY,
                                };
                            }
                            break;
                        case 3:
                            if(mouseDirection === "De haut en bas"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX,
                                    y: table.y,
                                };
                            }else if(mouseDirection === "De bas en haut"){
                                return {
                                    ...table,
                                    x: mouseX - offsetX,
                                    y: mouseY - offsetY > size.height ? table.y : mouseY - offsetY,
                                };
                            }
                            break;
                        default:
                            return {
                                ...table,
                                x: mouseX - offsetX,
                                y: mouseY - offsetY,
                            };
                    }                    
                }
                return table;
            });
    
            setTables(updatedTables);
        }
    };

    const handleMouseUp = () => {
        // x: (table.x*0.9/2+0.5) * canvas.width - table.taille*taille_tables/4,
        // y: (table.y*0.9/2+0.5) * canvas.height - taille_tables/2, 
        const taille_tables = 15;
        tables.forEach(table => {
            if (table.id === selectedTable) {
                console.log(table.x, table.y, table.ex_x, table.ex_y);
                if(Math.abs(table.x - table.ex_x) <= 1 && Math.abs(table.y - table.ex_y) <= 1){
                    
                    return;
                }
                const table_taille = table.width*2/taille_tables
                const newX = ((table.x + table_taille*taille_tables/4)/size.width - 0.5)*2/0.9;
                const newY =((table.y + taille_tables/2)/size.height - 0.5)*2/0.9;
                const newRotation = table.rotation*180/Math.PI;
                axios.post(`http://localhost:5000/tableupdate/${table.id}/${newX}/${newY}/${newRotation}`, {});
                table.ex_x = table.x;
                table.ex_y = table.y;
            }
        });
        setSelectedTable(null);
    };
    

    return (
        <canvas
            ref={canvasRef}
            width={size.width}
            height={size.height}
            style={{ border: '1px solid black' }} // Style du canvas
            onMouseDown={handleMouseDown} // Gestionnaire d'événement
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

// const [size, setSize] = useState({ width: 700, height: 700 });

//   useEffect(() => {
//     const handleResize = () => {
//       setSize({ width: window.innerWidth/2, height: window.innerHeight/2 });
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    shortName: 'Comprobadores',
    operations: [
        new Get(uriTemplate: '/comprobadores/{cod}'),
        new GetCollection(uriTemplate: '/comprobadores')
    ],
    paginationEnabled: false
)]

#[ORM\Entity]
#[ORM\Table(name: "FRMX_INTRANETIPR_COMPROBADORES")]
class Comprobador
{
    #[ORM\Id]
    #[ORM\Column(name: "COD", type: "string", length: 255)]
    public string $cod;

    #[ORM\Column(name: "DESCRIP", type: "string", length: 255)]
    public string $descrip;

    #[ORM\Column(name: "COD_DESCR_1", type: "string", nullable: true)]
    public ?string $codDescr1;

    #[ORM\Column(name: "DESCRIP_1", type: "string", nullable: true)]
    public ?string $descrip1;

    #[ORM\Column(name: "F_ALTA_1", type: "string", nullable: true)]
    public ?string $fAlta1;

    #[ORM\Column(name: "F_BAJA_1", type: "string", nullable: true)]
    public ?string $fBaja1;

    #[ORM\Column(name: "PATH_FIC_1", type: "string", nullable: true)]
    public ?string $pathFic1;

    #[ORM\Column(name: "COD_DESCR_2", type: "string", nullable: true)]
    public ?string $codDescr2;

    #[ORM\Column(name: "DESCRIP_2", type: "string", nullable: true)]
    public ?string $descrip2;

    #[ORM\Column(name: "F_ALTA_2", type: "string", nullable: true)]
    public ?string $fAlta2;

    #[ORM\Column(name: "F_BAJA_2", type: "string", nullable: true)]
    public ?string $fBaja2;

    #[ORM\Column(name: "PATH_FIC_2", type: "string", nullable: true)]
    public ?string $pathFic2;

    #[ORM\Column(name: "COD_DESCR_3", type: "string", nullable: true)]
    public ?string $codDescr3;

    #[ORM\Column(name: "DESCRIP_3", type: "string", nullable: true)]
    public ?string $descrip3;

    #[ORM\Column(name: "F_ALTA_3", type: "string", nullable: true)]
    public ?string $fAlta3;

    #[ORM\Column(name: "F_BAJA_3", type: "string", nullable: true)]
    public ?string $fBaja3;

    #[ORM\Column(name: "PATH_FIC_3", type: "string", nullable: true)]
    public ?string $pathFic3;

    #[ORM\Column(name: "COD_DESCR_4", type: "string", nullable: true)]
    public ?string $codDescr4;

    #[ORM\Column(name: "DESCRIP_4", type: "string", nullable: true)]
    public ?string $descrip4;

    #[ORM\Column(name: "F_ALTA_4", type: "string", nullable: true)]
    public ?string $fAlta4;

    #[ORM\Column(name: "F_BAJA_4", type: "string", nullable: true)]
    public ?string $fBaja4;

    #[ORM\Column(name: "PATH_FIC_4", type: "string", nullable: true)]
    public ?string $pathFic4;

    #[ORM\Column(name: "COD_DESCR_5", type: "string", nullable: true)]
    public ?string $codDescr5;

    #[ORM\Column(name: "DESCRIP_5", type: "string", nullable: true)]
    public ?string $descrip5;

    #[ORM\Column(name: "F_ALTA_5", type: "string", nullable: true)]
    public ?string $fAlta5;

    #[ORM\Column(name: "F_BAJA_5", type: "string", nullable: true)]
    public ?string $fBaja5;

    #[ORM\Column(name: "PATH_FIC_5", type: "string", nullable: true)]
    public ?string $pathFic5;
}

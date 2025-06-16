<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserDataPersister implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $decorated,
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $em
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof User) {
            $plainPassword = $data->getPassword();

            if ($plainPassword !== null && trim($plainPassword) !== '') {
                // Si se envió una nueva contraseña, se hashea
                $hashedPassword = $this->passwordHasher->hashPassword($data, $plainPassword);
                $data->setPassword($hashedPassword);
            } else {
                // Obtener usuario desde uriVariables si no está en el objeto
                $usuario = $data->getUsuario() ?? $uriVariables['usuario'] ?? null;

                if ($usuario) {
                    $originalUser = $this->em->getRepository(User::class)->find($usuario);
                    if ($originalUser) {
                        $data->setPassword($originalUser->getPassword());
                    }
                }
            }
        }

        return $this->decorated->process($data, $operation, $uriVariables, $context);
    }
}

